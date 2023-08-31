import Polity from "@/components/devline/Usage";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Image from "next/image";






export default function Usage() {
    return (
    <main className="flex flex-col w-full">
    <Header></Header>
        <div className="flex items-center gap-5 h-[180px]">
            <div className="rounded-full overflow-hidden">
                <Image alt=" " src="/devline/devline-logo-fulless.png" width={90} height={90}></Image>
            </div>
            <div>
                <h1 className="text-white font-medium text-2xl">Devliners</h1>
                <h1 className="text-white text-lg">@devlineweb</h1>
            </div>
        </div>
        <Polity></Polity>
    </main>
    )
}