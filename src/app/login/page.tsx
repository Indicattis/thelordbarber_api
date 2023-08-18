'use client'

import React, { useState } from 'react';
import Header from '@/components/header/Header';
import Button from '@/components/button/Button';
import animateJourney from '@/layout/animations/FadeUp';
import { motion } from 'framer-motion';
import useProcess from '@/data/hooks/useProcess';
import { handlePhoneChange } from '@/utils/Phone';
import { checkUserExistence } from '@/data/server/Cliente';
import Image from 'next/image';
import Sign from '@/components/content/loginpage/Cadastrar';
import Login from '@/components/content/loginpage/Logar';
import { FeedBackProps } from '@/components/feedback/template';
import FeedbackWrapper from '@/components/feedback/FeedBackWrapper';
import UserImages from '@/data/UserImages';


export default function LoginPage() {
    const [phone, setPhone] = useState<string>('');
    const [existingUser, setExistingUser] = useState(false);
    const [existingUserName, setExistingUserName] = useState('');
    const [isSign, setSign] = useState<boolean>(false);
    const { processing, processInit, processEnd } = useProcess();

    const [feedbackType, setFeedbackType] = useState<"warning" | "alert" | "success">('alert')
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState<boolean>(false);

    const feedbackController = (type: "warning" | "alert" | "success", message: string) => {
        setFeedbackType(type)
        setFeedbackMessage(message);
        setShowFeedback(true);
    }

    const handleButtonClick = async () => {
        processInit();
        const phoneNumber = parseInt(phone.replace(/[^0-9]/g, ''), 10);
        if (!isNaN(phoneNumber) && phone.replace(/[^0-9]/g, '').length === 11) {
            // Verifica se o número de telefone não é um NaN e tem 11 dígitos

            try {
                const userData = await checkUserExistence(phoneNumber);

                if (userData.exists) {
                    // Usuário existe no banco de dados
                    setExistingUser(true);
                    setExistingUserName(userData.name);
                    setSign(false);
                } else {
                    setExistingUser(false);
                    setSign(true);
                }
            } catch (error) {
                console.error(error);
            } finally {
                processEnd();
            }
        }
        else {
            setFeedbackMessage('Digite um número válido');
            setShowFeedback(true);
            processEnd();
        }
    };

    const handleReset = () => {
        setPhone("");
        setExistingUser(false);
        setExistingUserName("");
        setSign(false);
    };


    // const isButtonDisabled =
    //     isNaN(parseInt(phone.replace(/[^0-9]/g, ''))) ||
    //     phone.replace(/[^0-9]/g, '').length !== 11;

    return (
        <main>
            <Header></Header>
            <section className="flex w-4/5 gap-10 relative z-0 mt-10
        max-md:flex-col 
        max-md:w-full">
                <div>

                <motion.div
                    className="w-full h-full flex flex-col justify-center relative"
                    variants={animateJourney}
                    initial="start"
                    animate="visible"
                    exit="end"
                >
                    {processing ? (
                        <Image
                            alt=""
                            src="/gif/Pulse-1s-244px.gif"
                            width={24}
                            height={0}
                        />
                    ) : (
                        <div className="flex flex-col gap-5 font-poppins min-w-[350px] w-full text-white bg-black p-5 rounded-md">
                            <Image alt='' src={`/img/logoNew2.png`} width={200} height={200}></Image>
                            <div className='font-medium text-sm text-zinc-400'>{isSign ? (existingUser ? "Bem vindo!" : "Insira suas informações") : "Digite seu número de telefone:"}</div>
                            <input
                                type="text"
                                id="tel--number"
                                placeholder="(**) *****-****"
                                disabled={existingUser || isSign ? true : false}
                                onChange={(event) =>
                                    handlePhoneChange(event, setPhone)
                                }
                                value={phone}
                                className="bg-darkTheme outline-none p-3 w-full rounded-md"
                            />
                            {existingUser && (
                                <Login id={0} result={(type, message) => feedbackController(type, message)} handleReset={handleReset} existingUserName={existingUserName} phone={phone}/>
                            )}
                            {isSign && (
                                <Sign userImages={UserImages} result={(type, message) => feedbackController(type, message)} handleReset={handleReset} phone={phone}></Sign>
                            )}

                            {!existingUser && !isSign ? (
                                <div className='w-full flex gap-5'>
                                <Button
                                variant='primary'
                                onClick={handleButtonClick}
                                >
                                Próximo
                                </Button>
                                
                                </div>
                            ) : ""}
                        </div>
                    )}
                </motion.div>
                {showFeedback && (
                    <FeedbackWrapper
                    result={true}
                    feedbackProps={{
                        message: feedbackMessage,
                        type: feedbackType,
                        onClick: () => setShowFeedback(false)
                    }}
                    />
                )}
                </div>
            </section>
            
        </main>
    );
}



function showFeedback(type: 'warning' | 'alert' | 'success', message: string) {
  const feedbackProps: FeedBackProps = {
    message,
    type,
    onClick: () => {
      // Função opcional para lidar com o clique no botão de fechar (se necessário)
      // Aqui, você pode definir a lógica para fechar o feedback se necessário
    },
  };

  return <FeedbackWrapper result={true} feedbackProps={feedbackProps} />;
}