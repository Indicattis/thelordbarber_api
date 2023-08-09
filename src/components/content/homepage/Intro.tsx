'use client'

import Button from "@/components/button/Button";
import { useUser } from "@/data/server/Token";
import { motion } from "framer-motion"
import Image from "next/image";




export default function Intro() {
    const { userLoged, userName } = useUser();
    return (
        <motion.div
        className="w-full flex flex-col justify-center items-center text-white font-sans overflow-hidden relative"
        >
        <div className="w-full flex mt-[-30px]">
            <Image src="/img/pendente_aramado.png" alt="" width={100} height={100}/>
            <Image src="/img/pendente_aramado.png" alt="" width={100} height={100}/>
            <Image src="/img/pendente_aramado.png" alt="" width={100} height={100}/>
            <Image src="/img/pendente_aramado.png" alt="" width={100} height={100}/>
            <Image src="/img/pendente_aramado.png" alt="" width={100} height={100}/>
            <Image src="/img/pendente_aramado.png" alt="" width={100} height={100}/>
            <Image src="/img/pendente_aramado.png" alt="" width={100} height={100}/>
            <Image src="/img/pendente_aramado.png" alt="" width={100} height={100}/>
        </div>
        
        <div>
            <img src="img/logoNew2.png" alt="" width={250}/>
        </div>
            {userLoged ? (
                ''
            ): (
                <div>
                    <Button variant="primary">Clique aqui para fazer login!</Button>
                </div>
            )}
        </motion.div>
    )
}