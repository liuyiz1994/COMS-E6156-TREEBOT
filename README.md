
## Setup (for Mac system)
### In this repo, folder "rocobench" is the experimental dataset; In folder "rocobench", file "onlyarm copy.xml" is the new scenario created by this project related to construction bricklaying.

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
This is required for prompting GPTs. Put your OPENAI key string somewhere safely in your local repo, and provide a file path (something like `./tot_robo/openai_key.json`) and load them in the scripts. Example code snippet:
```
import openai  
openai.api_key = YOUR_OPENAI_KEY

import anthropic
client = anthropic.Client(api_key=YOUR_OPENAI_KEY)
streamed = client.completion_stream(...)  
```

## Usage 
### Run robot control on the Rope-moving Task using the GPT-4/GPT-3.5 model
```
$ conda activate tot_robo
(tot_robo) $ python run_dialog.py --task rope -llm gpt-4
```
