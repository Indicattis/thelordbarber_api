import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import axios from "axios";
import Button from "@/components/button/Button";
import Clientes from "@/data/Clientes";
import useProcess from "@/data/hooks/useProcess";
import { handleLogin } from "@/data/server/Cliente";
import { serverUrl } from "@/data/server/Config";
import { motion } from "framer-motion"
import animateJourney from "@/layout/animations/FadeUp";
import { useEffect, useState } from "react";

interface LoginProps {
    existingUserName: string
    id: number
    phone: string
    handleReset: () => void
    result: (type: "warning" | "alert" | "success", message: string) => void
}

export default function Login(props: LoginProps) {
    const [password, setPassword] = useState('');
    const { processing, processInit, processEnd } = useProcess();
    const [userData, setUserData] = useState<Clientes>()
    const [passwordType, setPasswordType] = useState<boolean>(false)

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPassword(value);
    };

    const login = async() => {
        try {
            processInit()
            const response = await handleLogin(props.phone, password)

            if (response.authenticated) {
                props.result("success", "Bem vindo(a)")
                window.location.href = '/agendamento'
            } 
            else {
                props.result("warning", "Senha icorreta")
            }
        } catch (error) {
            console.error(error);
        }

        finally {
            processEnd()
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                processInit()
                const response = await axios.get(
                    `${serverUrl}/clientes-id/${props.id}`
                );
                setUserData(response.data)
            } catch (error) {
                console.log(error);
                props.result("warning", "Erro")
            }
            finally {
                processEnd()
            }
        };

        fetchData();
    }, []);

    return(
        <motion.div className="w-full"
        variants={animateJourney}
        initial="start"
        animate="visible"
        exit="end">
            {processing ? "" : (
            <div className='flex flex-col gap-5 w-full'>
                <input 
                type="text" 
                disabled
                defaultValue={props.existingUserName}
                className='bg-darkTheme outline-none p-3 w-full rounded-md'
                />
                <div className="w-full relative">
                    <input 
                    type={!passwordType ? "password" : "text"}
                    placeholder='Senha'
                    className='bg-darkTheme outline-none p-3 w-full rounded-md'
                    onChange={(event) => handlePasswordChange(event)}
                    />
                    <div className="absolute right-5 top-3 cursor-pointer"
                    onClick={() => setPasswordType(!passwordType)}>
                        {passwordType ? (
                            <IconEye/>
                        ) : (
                            <IconEyeClosed/>
                        )}
                    </div>
                </div>
                
                <div className="w-full flex gap-5">
                    <Button variant="red" onClick={() => props.handleReset()}>Voltar</Button>
                    <Button variant="green" onClick={() => login()}>Entrar</Button>
                </div>
            </div>
            )}
        </motion.div>
    )
}