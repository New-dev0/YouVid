import json
from fastapi import FastAPI, Request, Response
from fastapi.responses import RedirectResponse

from youtubesearchpython import Channel, ChannelRequestType, VideosSearch
from models import *

app = FastAPI()


@app.get("/")
async def root():
    return RedirectResponse("https://github.com/New-dev0")

@app.get("/info")
async def getChannelInfo(id: str):
    ch = Channel(id, ChannelRequestType.info)
    return ch.result

@app.get("/playlist")
async def playListId(id: str):
    return

@app.post("/create")
async def create(request: Request, response: Response):
    response.headers.append("Access-Control-Allow-Origin", "*")
    return await create_session(request)

@app.post("/end")
async def create(request: Request, response: Response):
    response.headers.append("Access-Control-Allow-Origin", "*")
    return await end_session(request)


@app.post("/message")
async def create(request: Request, response: Response):
    response.headers.append("Access-Control-Allow-Origin", "*")
    return await process_message(request)