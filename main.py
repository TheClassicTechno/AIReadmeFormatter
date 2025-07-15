from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import openai
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Load OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Allow frontend dev server to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/format-readme")
async def format_readme(req: Request):
    data = await req.json()
    raw_readme = data.get("readme", "").strip()
    
    if not raw_readme:
        return {"error": "No README content provided."}

    # Include both the formatting instructions AND the actual raw README
    prompt = f"""
You are a Markdown formatting expert. Your task is to take a raw or unstructured README content and improve its formatting.

Return a clean, professional, and well-organized version of the README in Markdown only.

Follow these formatting rules:
- Use appropriate headings with #, ##, and ### to define hierarchy
- Add line breaks and spacing for readability
- Format lists with - bullets or numbered lists (1., 2.)
- Convert code or commands into fenced code blocks (```bash or ```json etc.)
- Preserve the original technical meaning, but improve layout
- Output only the improved Markdown README—no explanations or extra text

README content:
{raw_readme}
"""

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a Markdown formatting assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2,
            max_tokens=1500,
        )
        formatted = response["choices"][0]["message"]["content"]
        return {"formatted_readme": formatted}
    
    except Exception as e:
        return {"error": str(e)}
