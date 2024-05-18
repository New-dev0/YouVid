import json
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from youtubesearchpython import Channel, ChannelRequestType, VideosSearch

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