'use client'

import About from "@/components/devline/About";
import Contact from "@/components/devline/Contact";
import Privacity from "@/components/devline/Privacity";
import Terms from "@/components/devline/Terms";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";


export default function Polity() {
    const [selected, setSelected] = useState<number>(1);

    return (
        <div className="bg-black center--element p-1 flex gap-3 rounded-lg text-white max-md:w-full max-md:flex-col">
            <div className="font-medium w-[400px] flex flex-col gap-2 max-md:w-full">
                <div className={`bg-darkTheme w-full p-2 rounded-sm border border-zinc-800 cursor-pointer hover:bg-zinc-800 transition-all
                ${selected == 1 && 'bg-zinc-800'}`}
                onClick={() => setSelected(1)}>
                    Termos de uso
                </div>
                <div className={`bg-darkTheme w-full p-2 rounded-sm border border-zinc-800 cursor-pointer hover:bg-zinc-800 transition-all
                ${selected == 2 && 'bg-zinc-800'}`}
                onClick={() => setSelected(2)}>
                    Políticas de privacidade
                </div>
                <div className={`bg-darkTheme w-full p-2 rounded-sm border border-zinc-800 cursor-pointer hover:bg-zinc-800 transition-all
                ${selected == 3 && 'bg-zinc-800'}`}
                onClick={() => setSelected(3)}>
                    Sobre nós
                </div>
                <div className={`bg-darkTheme w-full p-2 rounded-sm border border-zinc-800 cursor-pointer hover:bg-zinc-800 transition-all
                ${selected == 4 && 'bg-zinc-800'}`}
                onClick={() => setSelected(4)}>
                    Suporte
                </div>
            </div>
            <div className="w-full max-md:text-sm overflow-y-auto h-[300px]">
                {selected == 1 && (
                    <div className="rounded-md">
                        <Terms/>
                    </div>
                )}
                {selected == 2 && (
                    <div className="rounded-md">
                        <Privacity/>
                    </div>
                )}
                {selected == 3 && (
                    <div className="rounded-md">
                        <About/>
                    </div>
                )}
                {selected == 4 && (
                    <div className="rounded-md">
                        <Contact/>
                    </div>
                )}
            </div>
        </div>
    );
}
