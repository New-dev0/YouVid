import json
from .search import search_images
from config import GROQ_API
from fastapi import Response, Request
from groq import Client
from .session import sessionHolder

client = Client(api_key=GROQ_API)


async def process_message(request: Request):
    message = await request.json()
    sessionId = message.get("sessionId")
    message = message.get("message")
    if not sessionHolder.get(sessionId):
        return {"ok": False, "message": "You need to create a session first!"}
    if not message:
        return {"ok": False, "message": "Please provide message in body!"}
    sData = sessionHolder[sessionId]
    messages = sData.get("messages", [])
    if not messages:
        with open("prompt.txt", "r") as f:
            prompt = f.read()

        messages = [
            {"role": "system", "content": prompt},
            {
                "role": "system",
                "content": f"""here are the guidelines or summary by the tutor:
{sData.get('userPrompt')}""",
            },
        ]
    messages.append({"role": "user", "content": message})
    res = client.chat.completions.create(
        messages=messages,
        model="llama3-70b-8192",
    )
    choice = res.choices[0].message.content
    print(choice)
    data = json.loads(choice)

    for index, item in enumerate(data):
        if item.get("function") == "searchImages":
            data[index]["content"] = await search_images(item["query"], item["count"])
    messages.append({"role": "assistant", "content": choice})
    return {"ok": True, "data": data}