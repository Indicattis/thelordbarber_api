"use client";

import Button from "@/components/button/Button";
import UserInsights from "@/components/content/userpage/UsuarioInsights";
import { useUser } from "@/data/server/Token";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Intro() {
    const { userLoged, userName, userID } = useUser();
    return (
        <motion.div className="w-full flex flex-col justify-center items-center text-white font-sans overflow-hidden relative">
            <div className="w-full flex mt-[-30px]">
                <Image
                    src="/img/pendente_aramado.png"
                    alt=""
                    width={100}
                    height={100}
                />
                <Image
                    src="/img/pendente_aramado.png"
                    alt=""
                    width={100}
                    height={100}
                />
                <Image
                    src="/img/pendente_aramado.png"
                    alt=""
                    width={100}
                    height={100}
                />
                <Image
                    src="/img/pendente_aramado.png"
                    alt=""
                    width={100}
                    height={100}
                />
                <Image
                    src="/img/pendente_aramado.png"
                    alt=""
                    width={100}
                    height={100}
                />
                <Image
                    src="/img/pendente_aramado.png"
                    alt=""
                    width={100}
                    height={100}
                />
                <Image
                    src="/img/pendente_aramado.png"
                    alt=""
                    width={100}
                    height={100}
                />
                <Image
                    src="/img/pendente_aramado.png"
                    alt=""
                    width={100}
                    height={100}
                />
            </div>

            {userLoged ? (
                <div className="flex gap-5 max-md:flex-col">
                    <div className="bg-darkTheme border border-zinc-800 rounded-full h-[250px] flex items-center">
                        <Image
                            src="/img/logoNew2.png"
                            alt=""
                            width={250}
                            height={0}
                        />
                    </div>
                    <div className="flex flex-col gap-3 p-3 rounded-md font-senthir text-sm items-center justify-center">
                        <UserInsights id={userID}></UserInsights>
                    </div>
                </div>
            ) : (
                <div className="flex gap-5 max-md:flex-col">
                    <div className="bg-darkTheme border border-zinc-800 rounded-full h-[250px] flex items-center">
                        <Image
                            src="/img/logoNew2.png"
                            alt=""
                            width={250}
                            height={0}
                        />
                    </div>
                    <div className="flex flex-col gap-3 p-3 rounded-md font-senthir text-sm w-96 items-center justify-center">
                        <h1>Bem vindo!</h1>
                        <p className="font-sans text-zinc-200">
                            Faça login ou crie uma conta para realizar
                            agendamentos e participar da comunidade The Lord!
                        </p>
                        <div>
                            <Button
                                variant="primary"
                                onClick={() =>
                                    (window.location.href = "/login")
                                }
                            >
                                Entrar ou Cadastrar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
