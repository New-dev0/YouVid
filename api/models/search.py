import asyncio
from aiohttp import ClientSession
from bs4 import BeautifulSoup

async def search_images(query: str, count: int = 1):
    async with ClientSession() as ses:
        async with ses.get(f"https://www.google.com/search?q={query}&sclient=img&udm=2",
                           ) as res:
            soup = BeautifulSoup(await res.read(), "html.parser", from_encoding="utf8")
            return [a.get("src") for a in (soup.find_all("img") or []) if not a.get("src").startswith("/")][:count]