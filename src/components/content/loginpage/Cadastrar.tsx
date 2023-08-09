import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import Button from "@/components/button/Button";
import UserImages, { UserImagesDisplay } from "@/data/UserImages";
import useProcess from "@/data/hooks/useProcess";
import { handleSign } from "@/data/server/Cliente";
import { motion } from "framer-motion"
import animateJourney from "@/layout/animations/FadeUp";
import Image from "next/image";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";


interface SignProps {
    userImages: UserImagesDisplay[]
    handleReset: () => void
    phone: string
    result: (type: "warning" | "alert" | "success", message: string) => void
}

export default function Sign(props: SignProps) {
    const { processing, processInit, processEnd } = useProcess();

    const [repeatPassword, setRepeatPassword] = useState('');
    const [password, setPassword] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [username, setUsername] = useState('');
    const [userImage, setUserIage] = useState(1)
    const [passwordType, setPasswordType] = useState<boolean>(false)

    const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRepeatPassword(value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPassword(value);
    };

    const handleSobrenomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSobrenome(value);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUsername(value);
    };

    const handleImageChange = (e: any) => {
        setUserIage(e)
    }

    const sign = async () => {
        processInit()
        const phoneNumber = parseInt(props.phone.replace(/[^0-9]/g, ''), 10);
        if (!isNaN(phoneNumber) && props.phone.replace(/[^0-9]/g, '').length === 11) {

            if (password !== repeatPassword) {
                processEnd();
                props.result("alert", "As senhas não coincidem")
                return;
              }
          
              const userData = {
                phone: phoneNumber,
                username: username +" "+ sobrenome,
                password: password, // Use o valor da primeira senha digitada aqui
                image: userImage
              };

            try {
                const response = await handleSign(userData)
                if (response.data.message) {
                    props.result("success", "Bem vindo(a)")
                } 
                else {
                    props.result("warning", "Erro ao realizar o cadastro")
                }
            }
            finally {
                processEnd();
                props.handleReset()
            }
        }
    }

    return (
        <motion.div 
        className="w-full"
        variants={animateJourney}
        initial="start"
        animate="visible"
        exit="end">
            <div className='flex flex-col gap-5 w-full'>
                <div className="flex gap-5 w-full">
                    <input 
                    type="text" 
                    placeholder="Seu nome" 
                    onChange={(event) => handleNameChange(event)}
                    className='bg-darkTheme outline-none p-3 w-full rounded-md'
                    />
                    <input
                    type="text"
                    placeholder="Sobrenome"
                    onChange={(event) => handleSobrenomeChange(event)}
                    className='bg-darkTheme outline-none p-3 w-full rounded-md'
                    />
                </div>
                <div className="w-full">
                    <input
                    type={!passwordType ? "password" : "text"}
                    placeholder="Senha"
                    className="bg-darkTheme outline-none p-3 w-full rounded-md"
                    onChange={(event) => handlePasswordChange(event)}
                    />
                </div>
                <div className="w-full">
                    <input
                    type={!passwordType ? "password" : "text"}
                    placeholder="Repetir Senha"
                    className="bg-darkTheme outline-none p-3 w-full rounded-md"
                    onChange={(event) => handleRepeatPasswordChange(event)}
                    />

                </div>
                
                <div className="cursor-pointer flex gap-3 text-zinc-400"
                    onClick={() => setPasswordType(!passwordType)}>
                        {passwordType ? (
                            'Esconder senha'
                        ) : (
                            'Mostrar senha'
                        )}
                        {passwordType ? (
                            <IconEye/>
                        ) : (
                            <IconEyeClosed/>
                        )}
                    </div>
                <div className="grid grid-cols-5 w-full gap-5">
                    {props.userImages.map((item) => (
                        <div key={item.id}
                        className={`cursor-pointer border p-1 rounded-md w-14 h-14 transition-all
                        ${userImage === item.id ? "border-white":"border-zinc-800"}`}
                        onClick={() => handleImageChange(item.id)}>
                            <Image alt="" src={`/${item.image}`} width={50} height={50}></Image>
                        </div>
                    )) }
                </div>
                <div className="w-full flex gap-5">
                    <Button variant="red" onClick={() => props.handleReset()}>Voltar</Button>
                    <Button variant="green" onClick={() => sign()}>{processing ? "" : "Cadastrar"}</Button>
                </div>
            </div>
        </motion.div>
    )
}