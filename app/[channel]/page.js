"use client";
import AppBar from "@/components/AppBar";
import ChannelCard from "@/components/ChannelCard";
import VideosList from "@/components/PopularVideos";
import NoVideos from "@/components/NoVideos";
import { useEffect, useState } from "react";

export default function ChannelPage({ params }) {
    let hash = params.channel;
    const [channelResponse, setChannelResponse] = useState();
    const thumbImage = channelResponse?.thumbnails[channelResponse.thumbnails.length - 1].url;
    const localdata = channelResponse?.moreData;

    useEffect(() => {
        fetch("/task?id=" + hash)
            .then(response => response.json())
            .then(data => {
                setChannelResponse(data);
            });
    }, [hash])

    return <>
        <div className="bg-white dark:bg-slate-700 h-full">
            <main>
                <AppBar name={channelResponse?.title} icon={thumbImage} />
                <div className="flex flex-row justify-evenly">
                    <ChannelCard description={channelResponse?.description} image={thumbImage}
                        socialLinks={localdata && localdata?.socialLinks
                        } />

                    {localdata?.videos ? <VideosList videos={localdata?.videos} /> : <NoVideos />}
                </div>
            </main>        </div>
        <div className="flex flex-row bottom-0 fixed py-3 px-3 w-full border-t-2 dark:border-t-0  dark:bg-slate-800 dark:text-white justify-between">
        </div>
    </>
}
