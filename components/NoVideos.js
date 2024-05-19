import Image from "next/image";
import { Amatic_SC } from "next/font/google"

const font = Amatic_SC({
    subsets: ["latin"],
    weight: "700"
});

export default function Component() {
    return <>
        <div className="flex flex-col min-w-96 max-h-96 self-center min-h-36 justify-center align-middle p-4 leading-normal bg-slate-600 border-b"
            style={{ borderRadius: 30 }}>
                <div className="flex flex-row justify-center">
                <Image alt="" src="https://img.icons8.com/?size=100&id=19318&format=png" height={100} width={100}
            />

                </div>
            <h1 className="mb-2 mt-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
            >
                <p className={font.className} style={{fontSize: 50}}>
                    Videos: Coming Soon
                </p>
            </h1>
        </div>
    </>
}