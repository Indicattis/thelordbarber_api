import axios from "axios";
import Button from "@/components/button/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import animateJourney from "@/layout/animations/FadeUp";
import Image from "next/image";
import useProcess from "@/data/hooks/useProcess";
import { serverUrl } from "@/data/server/Config";


interface DashboardLoginProps {
    sendToken: (token: any, user: any, id: number, nome: string, image: string) => void
}

export default function Login(props: DashboardLoginProps) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginFeedback, setFeedback] = useState<boolean>(false)

    const { processing, processInit, processEnd } = useProcess()

    async function handleLogin(data: any) {
        try {
            const response = await axios.post(`${serverUrl}/admin-login`, data);
            processInit()

            await timer()
            if (response.data.authenticated) {
                const newToken = response.data.token;
                const newUser = response.data.login;
                const newId = response.data.id;
                const newName = response.data.nome;
                const newImage = response.data.imagem;
                props.sendToken(newToken, newUser, newId, newName, newImage);
            } else {
                setFeedback(true)
            }
        } catch (error) {
            console.error(error);
        }

        finally {
            processEnd()
        }
    };

    async function timer() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(1)
            }, 2000)
        })
    }



    return (
        <div className="bg-white p-3 w-[400px] max-md:w-full rounded-md">
            <Image className="w-36" src="/img/logoNewBlack.png" alt="" width={1000} height={1000} />
            <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit(handleLogin)}>
                <input
                    className="p-2 rounded-sm bg-zinc-100"
                    type="text"
                    placeholder="Usuário"
                    {...register("login")}
                />
                <input
                    className="p-2 rounded-sm bg-zinc-100"
                    type="password"
                    placeholder="Senha"
                    {...register("password")}
                />
                <Button variant="green" type="submit">{processing ? <Image alt="" src="/gif/Pulse-1s-244px.gif" width={24} height={0}></Image> : "Entrar"}</Button>
                {loginFeedback && (
                    <motion.div className="absolute p-5 left-0 text-white bg-red-500 top-0 w-full flex"
                        variants={animateJourney}
                        initial="start"
                        animate="visible"
                        exit="end">
                        <div className="w-full">
                            Usuário ou senha incorretos!
                        </div>
                        <IconX className="cursor-pointer" onClick={() => setFeedback(false)}></IconX>
                    </motion.div>
                )}
            </form>
        </div>
    );
}

