import json
from uuid import uuid1
from time import time
from fastapi import Request, Response

sessionHolder = {}

async def create_session(request: Request):
    data = await request.json()
    uuid = str(uuid1())
    sessionHolder[uuid] = {
        "createdAt": time(),
        "userPrompt": data.get("message")
    }
    return {"ok": True, "id": uuid}

async def end_session(sessionId: str):
    if sessionId in sessionHolder:
        del sessionHolder[sessionId]
    return Response(json.dumps(True),
                    headers={"Content-Type": "application/json"})

