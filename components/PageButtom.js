import { useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";

export default function PageBottom({ onStart }) {
    const [text, setText] = useState();
    const { listen, listening, stop } = useSpeechRecognition({
      onResult: (result) => {
        setText(result)
      }
    });
  
    return <div className="flex flex-row bottom-0 fixed py-3 px-3 w-full border-t-2 dark:border-t-0  dark:bg-slate-800 dark:text-white justify-between">
      <div className='mt-2'>
        State: {listening ? "Listening.." : 'Stopped'}
      </div>
      <div className='mt-2'>
        {text}
      </div>
      <div>
        {listening ? <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={stop}>
          Stop
        </button>
          :
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              listen();
              onStart()
            }}>
            Start
          </button>}
      </div>
    </div>
  }
  