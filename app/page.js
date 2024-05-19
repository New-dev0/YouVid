const fs = require("fs");
import AppBar from '@/components/AppBar';
import Image from 'next/image';


function SignINButton() {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Sign In
    </button>
  )
}

export default async function Home() {
  let filesMap = [];
  await Promise.all(fs.readdirSync("_channels/").map(async d => {
    const data = JSON.parse(fs.readFileSync("_channels/" + d));
    let resp = await fetch(`https://ytapi-chi.vercel.app/info?id=${data.channelId}`);
    const channel = await resp.json();
    filesMap.push({
      id: d.split(".")[0],
      name: channel.title,
      image: channel.thumbnails[channel.thumbnails.length - 1].url,
      description: channel.description,
    });
  }));
  return (
    <div className='bg-white dark:bg-slate-700 h-full'>
      <main>
        <AppBar name={"YoutubeTracker"} icon={"https://img.icons8.com/?size=48&id=19318&format=png"}
        //extraOptions={<SignINButton />}
        />
        <div className='py-5 px-20 md:px-5'>
          {filesMap.map((channel, index) => {
            return <div className='flex flex-col mt-2' key={index}><div className='flex flex-row justify-center mx-2'>
              <a href={`/${channel['id']}`} className="flex flex-col  items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className='flex flex-row'>
                  <Image src={channel.image} className='max-w-42 max-h-42 min-w-32' alt=''/>
                  <div className='flex flex-col'>
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{channel.name}</h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{channel.description}</p>
                    </div>
                    <div className='flex justify-end flex-row mx-5 mt-2'>
                      <button className=" bg-blue-500 dark:bg-slate-500 hover:bg-blue-700 text-white min-w-44 font-bold py-2 px-4 rounded">
                        VISIT
                      </button>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            </div>
          })}
        </div>
      </main>
      <div className="flex flex-row justify-center bottom-0 fixed py-3 px-3 w-full border-t-2 dark:border-t-0  dark:bg-slate-800 dark:text-white  text-center">
        <a href='https://github.com/New-dev0/YouVid/edit/main/_channels/channelName.json' className='text-center text-blue-200'>
          Add your channel
        </a>
      </div>
    </div>
  )
}
