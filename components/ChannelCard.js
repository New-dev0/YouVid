import Image from "next/image"

export default function ChannelCard({ image, title, description, socialLinks }) {
    return <div className=' flex flex-col px-5 py-8'>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg min-w-96 min-h-96" src={image} alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
                {socialLinks?.map((d, index) => {
                    //                    console.log(d);
                    return <a key={index} href={d.url} className="inline-flex items-center mx-1 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
                        style={{
                            backgroundColor: typeof d.bgcolor === "string" ? d.bgcolor : null
                        }}>
                        <Image src={d.icon} height={20} width={20} />
                        {d.title.length > 1 &&
                            <span className='ml-3'>{d.title}</span>}
                    </a>
                })}
            </div>
        </div>
    </div>
}