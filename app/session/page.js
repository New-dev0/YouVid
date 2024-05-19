"use client";

import AppBar from "@/components/AppBar";
import { useEffect, useState } from "react";
import { useSpeechRecognition, useSpeechSynthesis } from "react-speech-kit";

export default function SessionPage() {
    const [text, setText] = useState();
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result) => {
            setText(result)
        }
    });
    const [data, setData] = useState([]);
    const [sessionId, setSessionId] = useState();
    const [started, setStarted] = useState();
    const [prompt, setPrompt] = useState();

    async function fetchMessage() {
        const req = await fetch(
            `http://localhost:8000/message`,
            {
                method: "POST",
                body: JSON.stringify({
                    "message": text,
                    "sessionId": sessionId
                })
            });
        const response = await req.json();
        setData(response?.data);
    }

    useEffect(() => {
        if (text) fetchMessage();
    }, [
        text
    ]);

    async function startSession() {
        console.log(prompt);
        const req = await fetch(
            `http://localhost:8000/create`,
            {
                method: "POST",
                body: JSON.stringify({
                    "message": prompt
                })
            });
        const data = await req.json();
        setSessionId(data?.id);
        setStarted(true);
    }

    return <>
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
        <div className="flex flex-col justify-center items-center dark:bg-slate-800">
            <main className="flex flex-col items-center w-full  pb-20">

                {started ? <>
                    {data && data.map((d, index) => {
                        console.log(d);
                        if (d.tag === "h1") {
                            return <h1 className="text-3xl font-bold text-slate-100 font-serif" key={index}>{d.content}</h1>
                        }
                        if (d.tag === "h2") {
                            return <h2 className="text-2xl font-bold text-slate-100 font-serif" key={index}>{d.content}</h2>
                        }
                        if (d.tag === "p") {
                            return <p className="text-sm" key={index}>{d.content}</p>
                        }

})}

                    <div className="flex flex-col fixed bottom-10 items-center">
                        {(listening ? <button className="relative h-12 w-48 overflow-hidden rounded-2xl  bg-red-500 font-bold text-white hover:bg-red-800"
                            onClick={stop}
                        >
                            Stop Recording.
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl"></div>
                        </button> : <button className="relative h-12 w-48 overflow-hidden rounded-2xl  bg-green-700 font-bold text-white hover:bg-green-800"
                            onClick={() => listen({ interimResults: false })}
                        >
                            Start Recording..
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl"></div>
                        </button>)}
                        <div className="flex text-3xl  flex-row rounded-md px-3 py-1 bg-slate-300 min-w-96 mt-10">
                            {text}
                        </div>

                    </div>
                </>
                    : <><div className="w-full text-center my-6 pt-10">
                        <h1 className="text-3xl font-bold text-slate-100 font-serif">Create Voice Session</h1>
                    </div>
                        <div className="flex flex-row justify-evenly ml-5 mt-14">
                            <lottie-player src="https://lottie.host/ee765555-8ece-4b8e-b702-a661643f19bf/a5cWr8l9pD.json" background="##fff" speed="1" style={{ width: "300px", height: "300px" }} loop autoplay direction="1" mode="normal"></lottie-player>
                            <div className="flex flex-col ml-10 justify-center">
                                <div style={{
                                }} className="mt-0.5">
                                    <div className="relative mb-6">
                                        <textarea aria-multiline type="text"
                                            id="input-group-1" className="bg-gray-50 min-h-40 min-w-96 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Enter your prompt"
                                            onChange={e => setPrompt(e.target.value)} />
                                    </div>

                                </div>

                            </div>
                        </div></>}

                {!started && <button className="relative h-12 w-48 overflow-hidden rounded-2xl  bg-slate-900 font-bold text-white hover:bg-slate-300 hover:text-gray-950"
                    onClick={startSession}>
                    Start Session
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl"></div>
                </button>
                }
            </main>
        </div>
    </>
}