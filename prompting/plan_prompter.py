import os 
import json
import pickle 
import numpy as np
from rocobench.envs import MujocoSimEnv, EnvState
import openai
from datetime import datetime
from .feedback import FeedbackManager
from .parser import LLMResponseParser
from typing import List, Tuple, Dict, Union, Optional, Any

PATH_PLAN_INSTRUCTION="""
[How to plan PATH]
Each <coord> is a tuple (x,y,z) for gripper location, follow these steps to plan:
1) Decide target location (e.g. an object you want to pick), and your current gripper location.
2) Plan a list of <coord> that move smoothly from current gripper to the target location.
3) The <coord>s must be evenly spaced between start and target.
4) Each <coord> must not collide with other robots, and must stay away from table and objects.  
[How to Incoporate [Enviornment Feedback] to improve plan]
    If IK fails, propose more feasible step for the gripper to reach. 
    If detected collision, move robot so the gripper and the inhand object stay away from the collided objects. 
    If collision is detected at a Goal Step, choose a different action.
    To make a path more evenly spaced, make distance between pair-wise steps similar.
        e.g. given path [(0.1, 0.2, 0.3), (0.2, 0.2. 0.3), (0.3, 0.4. 0.7)], the distance between steps (0.1, 0.2, 0.3)-(0.2, 0.2. 0.3) is too low, and between (0.2, 0.2. 0.3)-(0.3, 0.4. 0.7) is too high. You can change the path to [(0.1, 0.2, 0.3), (0.15, 0.3. 0.5), (0.3, 0.4. 0.7)] 
    If a plan failed to execute, re-plan to choose more feasible steps in each PATH, or choose different actions.
"""
OPENAI_KEY = str(json.load(open("openai_key.json")))
openai.api_key = OPENAI_KEY

def get_chat_prompt(env: MujocoSimEnv):
    robot_names = env.get_sim_robots().keys()
    talk_order_str = ",".join([f"[{name}]" for name in robot_names])
    chat_prompt = f"""
The robots discuss to find the best strategy. They carefully analyze others' responses and use [Environment Feedback] to improve their plan. 
They talk in order {talk_order_str}... Once they reach agreement, they summarize the plan by **strictly** following [Action Output Instruction] to format the output, then stop talking.
Their entire discussion and final plan are:
    """
    return chat_prompt 


def get_plan_prompt(env: MujocoSimEnv):
    return """
Reason about the task step-by-step, and find the best strategy to coordinate the robots. Propose a plan of **exactly** one action per robot.
Use [Environment Feedback] to improve your plan. Strictly follow [Action Output Instruction] to format and output the plan.
Your reasoning and final plan output are:
    """

def tot_prompt_wrap(self, x):
    return f"""
You are planning robot actions in a collaborative task.

Input State: {x}

Think step-by-step and explore multiple strategies using Tree-of-Thought reasoning.

==== ToT Reasoning ====

[Thought 1: Direct Pick-and-Place]
- Describe this strategy and robot actions

[Thought 2: Wait-and-Move Coordination]
- Describe this strategy and robot actions

[Decision]
Choose the best strategy and explain why.
Then output the plan in correct format:

EXECUTE
NAME robotA ACTION ...
NAME robotB ACTION ...
"""

def extract_strategies(self, raw_output):
    """
    Extracts all EXECUTE blocks from the LLM response.
    """
    parts = raw_output.split("EXECUTE")
    strategies = []
    for part in parts[1:]:  # skip preamble
        lines = part.strip().splitlines()
        plan_lines = [line for line in lines if line.startswith("NAME")]
        if plan_lines:
            strategies.append("EXECUTE\n" + "\n".join(plan_lines))
    return strategies


import itertools
import time

def get_value(task, x, y, n_evaluate_sample, cache_value=True):
    value_prompt = task.value_prompt_wrap(x, y)
    if cache_value and value_prompt in task.value_cache:
        return task.value_cache[value_prompt]
    value_outputs = gpt(value_prompt, n=n_evaluate_sample, stop=None)
    value = task.value_outputs_unwrap(x, y, value_outputs)
    if cache_value:
        task.value_cache[value_prompt] = value
    return value


def get_values(task, x, ys, n_evaluate_sample, cache_value=True):
    values = []
    local_value_cache = {}
    for y in ys:  # each partial output
        if y in local_value_cache:  # avoid duplicate candidates
            value = 0
        else:
            value = get_value(task, x, y, n_evaluate_sample, cache_value=cache_value)
            local_value_cache[y] = value
        values.append(value)
    return values


def get_votes(task, x, ys, n_evaluate_sample):
    vote_prompt = task.vote_prompt_wrap(x, ys)
    vote_outputs = gpt(vote_prompt, n=n_evaluate_sample, stop=None)
    values = task.vote_outputs_unwrap(vote_outputs, len(ys))
    return values


def get_proposals(task, x, y):
    propose_prompt = task.propose_prompt_wrap(x, y)
    proposals = gpt(propose_prompt, n=1, stop=None)[0].split('\n')
    return [y + _ + '\n' for _ in proposals]


def get_samples(task, x, y, n_generate_sample, prompt_sample, stop):
    if prompt_sample == 'standard':
        prompt = task.standard_prompt_wrap(x, y)
    elif prompt_sample == 'cot':
        prompt = task.cot_prompt_wrap(x, y)
    else:
        raise ValueError(f'prompt_sample {prompt_sample} not recognized')
    samples = gpt(prompt, n=n_generate_sample, stop=stop)
    return [y + _ for _ in samples]



def dfs_solve_new(args, task, idx, to_print=True):
    global gpt
    gpt = partial(gpt, model=args.backend, temperature=args.temperature)
    print(gpt)
    x = task.get_input(idx)  # initial input
    print('Sudoku puzzle:')
    print(x)
    print('-' * 80)

    # parameters
    T = task.steps[idx]  # step limit
    vthres = 0.5  # threshold for pruning; adjust as needed
    max_states_per_depth = 3

    # storage for recorded outputs at maximum depth
    results = []
    infos = []
    found_solution = False  # Flag to indicate that a solution has been found
    generate_times = []
    evaluate_times = []
    num_of_generations = 0
    num_of_evaluations = 0
    total_start_time = time.time()

    def dfs(s, t):
        nonlocal found_solution
        nonlocal num_of_generations
        nonlocal num_of_evaluations
        nonlocal generate_times
        nonlocal evaluate_times
        # If a solution was already found, stop exploring further
        if found_solution:
            return

        # If we have reached the step limit, record output as a solution
        if t >= T:
            if to_print:
                print(f"Reached step limit T={T}, recording solution:\n{s}")
            results.append(s)
            if task.test_output(idx, s)["r"] == 1:
                found_solution = True
            return

        # Generate candidates from current state `s`
        start_time = time.time()
        if args.method_generate == 'sample':
            candidates = get_samples(task, x, s, args.n_generate_sample, args.prompt_sample, stop=task.stops[t])
        elif args.method_generate == 'propose':
            candidates = get_proposals(task, x, s)
        else:
            raise ValueError(f"Unknown generation method: {args.method_generate}")
        generate_times.append(time.time() - start_time)
        num_of_generations += 1

        # Evaluate candidates
        start_time = time.time()
        if args.method_evaluate == 'vote':
            values = get_votes(task, x, candidates, args.n_evaluate_sample)
        elif args.method_evaluate == 'value':
            values = get_values(task, x, candidates, args.n_evaluate_sample, cache_value=False)
        else:
            raise ValueError(f"Unknown evaluation method: {args.method_evaluate}")
        evaluate_times.append(time.time() - start_time)
        num_of_evaluations += 1

        # Sort candidates by value descending
        sorted_candidates_values = sorted(zip(candidates, values), key=lambda x: x[1], reverse=True)

        top_candidates = sorted_candidates_values[:max_states_per_depth]

        # Logging current step if needed
        if to_print:
            candidate_strs = [f"{c} (val={v})" for c, v in top_candidates]
            print(f"Step {t}, Expanding state:\n{s}\nCandidates:\n{candidate_strs}\n")

        # Prune and recurse
        for cand, val in top_candidates:
            if found_solution:
                break
            if val > vthres:
                # Recurse deeper with candidate
                dfs(cand, t + 1)

    # Initiate DFS from empty solution
    dfs('', 0)

    # Return all recorded solutions and any info collected
    if to_print:
        print("DFS Completed. Final solutions:", results)

    logs = {
        'steps': infos,
        'total_time': time.time() - total_start_time,
        'generate_time': sum(generate_times),
        'evaluate_time': sum(evaluate_times),
        'num_of_generations': num_of_generations,
        'num_of_evaluations': num_of_evaluations,
        'num_of_steps': T,
    }
    return results, logs


class SingleThreadPrompter:
    """
    At each round, queries LLM once for each action plan, 
    query again with environment feedback if the action plan cannot be executed
    """
    def __init__(
        self, 
        env: MujocoSimEnv,
        parser: LLMResponseParser, 
        feedback_manager: FeedbackManager,
        comm_mode: str = "plan", # or chat or tot
        use_waypoints: bool = False,
        use_history: bool = True,
        max_api_queries: int = 3,
        num_replans: int = 3,
        debug_mode: bool = False,   
        temperature: float = 0,
        max_tokens: int = 1000, 
        llm_source: str = "gpt-4",
    ):
        self.env = env 
        self.robot_agent_names = env.get_sim_robots().keys()
        self.feedback_manager = feedback_manager
        self.parser = parser
        self.comm_mode = comm_mode
        self.max_api_queries = max_api_queries
        self.num_replans = num_replans
        self.debug_mode = debug_mode 
        self.use_waypoints = use_waypoints
        self.use_history = use_history
        self.temperature = temperature
        self.llm_source = llm_source
        self.max_tokens = max_tokens

        self.round_history = [] # [obs_t, action_t] but only if action_t got executed
        self.failed_plans = [] # could inherit from previous round if the final plan failed to execute in env.
        self.response_history = [] # [response_t]
        

    def save_state(self, save_path, fname = 'prompter_state.pkl'):
        state_dict = dict(
            round_history=self.round_history,
            failed_plans=self.failed_plans,
        )
        save_path = os.path.join(save_path, fname)
        with open(save_path, "wb") as f:
            pickle.dump(state_dict, f)

    def load_state(self, load_path, fname = 'prompter_state.pkl'):
        load_path = os.path.join(load_path, fname)
        with open(load_path, "rb") as f:
            state_dict = pickle.load(f)
        self.round_history = state_dict["round_history"]
        self.failed_plans = state_dict["failed_plans"]

    def compose_round_history(self):
        if len(self.round_history) == 0:
            return ""
        ret = "[History]\n"
        for i, history in enumerate(self.round_history):
            ret += f"== Round#{i} ==\n{history}"
        ret += f"== Current Round ==\n"
        return ret
        
    def compose_system_prompt(
        self,
        obs_desp: str,
        plan_feedbacks: List[str] = [], 
        ):
        
        task_desp = self.env.describe_task_context() # should include task rules
        action_desp = self.env.get_action_prompt()
        if self.use_waypoints:
            action_desp += PATH_PLAN_INSTRUCTION

        full_prompt = f"{task_desp}\n{action_desp}\n" 
        
        if self.use_history:
            history_desp = self.compose_round_history() 
            full_prompt += history_desp + "\n" 
        
        full_prompt += obs_desp + "\n"

        if len(self.failed_plans) > 0:
            execute_feedback = "Plans below failed to execute, improve them to avoid collision and smoothly reach the targets:\n"
            execute_feedback += "\n".join(self.failed_plans) 
            full_prompt += execute_feedback + "\n"

        if len(plan_feedbacks) > 0:
            feedback_prompt = "Previous Plans Require Improvement:\n"
            feedback_prompt += "\n".join(plan_feedbacks) + "\n"
            full_prompt += feedback_prompt
        
        if self.comm_mode == "plan":
            comm_prompt = get_plan_prompt(self.env)
        elif self.comm_mode == "chat":
            comm_prompt = get_chat_prompt(self.env)
        elif self.comm_mode == "tot":
            comm_prompt = get_tot_prompt(self.env)
        else:
            raise NotImplementedError
        full_prompt += comm_prompt

        return full_prompt 

    def prompt_one_round(self, obs: EnvState, save_path: str = ""): 
        plan_feedbacks = []
        response_history = []
        obs_desp = self.env.describe_obs(obs)
        for i in range(self.num_replans): 
            system_prompt = self.compose_system_prompt(obs_desp, plan_feedbacks)
            response, usage = self.query_once(
                system_prompt, user_prompt=""
                ) # NOTE: single_thread doesn't use user role
            response_history.append(response)
            
            timestamp = datetime.now().strftime("%m%d-%H%M")
            tosave = [ 
                    {
                        "sender": "SystemPrompt",
                        "message": system_prompt,
                    },
                    {
                        "sender": "UserPrompt",
                        "message": "",
                    },
                    {
                        "sender": "Planner",
                        "message": response,
                    },
                    usage,
                ]
            fname = f'{save_path}/replan{i}_{timestamp}.json'
            json.dump(tosave, open(fname, 'w'))  
            
            curr_feedback = "None"
            # try parsing 
            parse_succ, parsed_str, llm_plans = self.parser.parse(obs, response) 
            if not parse_succ: 
                execute_str = 'EXECUTE' + response.split('EXECUTE')[-1]
                curr_feedback = f"""
Parsing failed! {parsed_str}
Previous response: {execute_str}
Re-format to strictly follow [Action Output Instruction]!
                """
                plan_feedbacks.append(curr_feedback)
                ready_to_execute = False  
            # give env. feedback 
            else:
                ready_to_execute = True
                for j, llm_plan in enumerate(llm_plans): 
                    ready_to_execute, env_feedback = self.feedback_manager.give_feedback(llm_plan)        
                    if not ready_to_execute:
                        curr_feedback = env_feedback
                        break
            
            plan_feedbacks.append(curr_feedback)
            tosave = [
                {
                    "sender": "Feedback",
                    "message": curr_feedback,
                },
                {
                    "sender": "Action",
                    "message": (response if not parse_succ else llm_plans[0].get_action_desp()),
                },
            ]
            timestamp = datetime.now().strftime("%m%d-%H%M")
            fname = f'{save_path}/replan{i}_feedback_{timestamp}.json'
            json.dump(tosave, open(fname, 'w')) 

            if ready_to_execute:
                plan_str = parsed_str
                break  
        self.response_history = response_history
        return ready_to_execute, llm_plans, plan_feedbacks, response_history


    def query_once(self, system_prompt, user_prompt=""):
        response = None
        usage = None   
        # print('======= system prompt ======= \n ', system_prompt)
        if self.debug_mode: # query human user input
            response = "EXECUTE\n"
            for aname in self.robot_agent_names:
                action = input(f"Enter action for {aname}:\n")
                response += f"NAME {aname} ACTION {action}\n"
            return response, dict()

        for n in range(self.max_api_queries):
            print('querying {}th time'.format(n))
            try:
                response = openai.ChatCompletion.create(
                    model=self.llm_source,
                    messages=[
                        # {"role": "user", "content": user_prompt},
                        {"role": "system", "content": system_prompt},                                    
                    ],
                    max_tokens=self.max_tokens,
                    temperature=self.temperature, 
                    )
                usage = response['usage']
                response = response['choices'][0]['message']["content"]
                print('======= response ======= \n ', response)
                print('======= usage ======= \n ', usage)
                break
            except:
                print("API error, try again")
            continue
        return response, usage

    

    def post_execute_update(self, obs_desp: str, execute_success: bool, parsed_plan: str):
        if execute_success: 
            # clear failed plans, count the previous execute as full past round in history
            self.failed_plans = []
            responses = "\n".join(self.response_history)
            self.round_history.append(
                f"[Response History]\n{responses}\n{obs_desp}\n[Executed Action]\n{parsed_plan}"
            )
        else:
            self.failed_plans.append(
                parsed_plan
            )
        return

    def post_episode_update(self):
        # clear for next episode
        self.round_history = []
        self.failed_plans = [] 
        self.response_history = []