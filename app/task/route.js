const fs = require("fs");

export async function GET(request) {
    let hash = new URL(request.url).searchParams.get("id");
    const fileName = `_channels/${hash}.json`;
    let pageExists = fs.existsSync(fileName)
    let localdata;
    if (pageExists) {
        localdata = JSON.parse(fs.readFileSync(fileName, "utf-8"));
        hash = localdata.channelId;
    }
    const response = await fetch(
    
        `https://youvid-c0f7.onrender.com/info?id=${hash}`

    );
    const channelResponse = await response.json();
    channelResponse['moreData'] = localdata;
    return new Response(JSON.stringify(channelResponse), { "headers": { "content-type": "application/json" } });
}