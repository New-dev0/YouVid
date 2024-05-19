import Image from "next/image"

export default function AppBar({ name = "Youtube Tracker", icon = "https://img.icons8.com/?size=48&id=19318&format=png", showCreate = true, extraOptions }) {
    return <nav className="bg-white shadow-lg dark:bg-slate-800">
        <div className="md:flex items-center justify-between py-4 px-8 md:px-12">
            <div className="flex justify-between items-center">
                <div className="text-2xl font-bold text-gray-800 flex-row flex md:text-3xl justify-items-center dark:text-white">
                    <Image src={icon} alt="logo" width={40} height={40} className="rounded-lg" />
                    <a href="#" className='ml-3'>{name}</a>
                </div>
                <div className="md:hidden">
                    <button type="button" className="block text-gray-800 hover:text-gray-700 focus:text-gray-700 focus:outline-none">
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            <path className="hidden" d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z" />
                            <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                        </svg>
                    </button>
                </div>            </div>
            {extraOptions}
            {
                showCreate && <a href="/session">
                    <button className="block bg-white py-1 px-3 font-bold rounded-md text-gray-800 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
                    >
                        Start Voice
                    </button>
                </a>
            }
        </div>
    </nav>
}