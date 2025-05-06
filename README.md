
## Setup
### setup conda env and package install
```
conda create -n tot_robo python=3.8 
conda activate tot_robo
```
### Install mujoco and dm_control 
```
pip install mujoco==2.3.0
pip install dm_control==1.0.8 
```

### Install other packages
```
pip install -r requirements.txt
```

### Acquire OpenAI
This is required for prompting GPTs. Put your key string somewhere safely in your local repo, and provide a file path (something like `./roco/openai_key.json`) and load them in the scripts. Example code snippet:
```
import openai  
openai.api_key = YOUR_OPENAI_KEY

import anthropic
client = anthropic.Client(api_key=YOUR_OPENAI_KEY)
streamed = client.completion_stream(...)  
```

## Usage 
### Run robot control on the Rope-moving Task using the latest GPT-4 model
```
$ conda activate tot_robo
(tot_robo) $ python run_dialog.py --task rope -llm gpt-4
```
