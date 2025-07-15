# ReadmeFormatter

## by Juli Huang

My idea for making this chatgpt wrapper came about when doing research projects, internship projects, persnal projects, etc., but formatting github readmes to make them beuatiful takes a long time to do manually -and it's tedious. Moreover, ChatGPT doesn't format the readme's correctly, often only formatting the first few lines into markdown but the rest generated as text. Therefore, we can use this app to fully generate beautiful readme pages for open source developers. Hope u enjoy!

I then did a google search and found https://github.com/eli64s/readme-ai - Eli's goals are a bit similar to mine but complementary (his is AI generating a clean README from scratch, mine is AI revising an existing README to make it cleaner)
# How to Run

Install dependencies
pip install fastapi uvicorn openai

# Set your OpenAI API key

export OPENAI_API_KEY="your_openai_api_key"
or $Env:OPENAI_API_KEY = "sk-xxxxxx"

# Run backend server
uvicorn main:app --reload

# Run React dev server:
npx create-react-app readmeformatter
cd readmeformatter
npm start
Now open http://localhost:3000, paste your messy README, click Format README, and see ReadmeFormatter magically clean it up:)
