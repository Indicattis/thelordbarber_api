'use client'

import Calendario from '@/components/content/requirepage/Calendario';
import Header from '@/components/header/Header';
import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Horarios from '@/components/content/requirepage/Horarios';
import Produtos from '@/components/content/requirepage/Produtos';
import Haircuts from '@/data/Products';
import Barbeiro from '@/components/content/requirepage/Barbeiro';
import { getTokenInfo } from '@/data/server/Token';
import Image from 'next/image';
import FeedbackWrapper from '@/components/feedback/FeedBackWrapper';
import { FeedBackProps } from '@/components/feedback/template';
import Enviar from '@/components/content/requirepage/Enviar';


export default function Agendamento() {

    const [state, setState] = useState<number>(0)
    const [day, setDay] = useState('');
    const [hour, setHour] = useState('');
    const [corte, setCorte] = useState('');
    const [value, setValue] = useState(0);
    const [user, setUser] = useState(0);
    const [userId, setUserId] = useState(0);
    const [barber, setBarber] = useState<number>(1);

    const [feedbackType, setFeedbackType] = useState<"warning" | "alert" | "success">('alert')
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState<boolean>(false);

    const feedbackController = (type: "warning" | "alert" | "success", message: string) => {
        setFeedbackType(type)
        setFeedbackMessage(message);
        setShowFeedback(true);
    }


    const Auth = useCallback( async () => {
        try {
            const tokenInfo = await getTokenInfo();
            if (!tokenInfo) {
              window.location.href = '/login';
            } else {
            //   console.log('ID:', tokenInfo.id);
            //   console.log('Nome:', tokenInfo.name);
            //   console.log('Telefone:', tokenInfo.phone);
    
              setUser(tokenInfo.phone)
              setUserId(tokenInfo.id)
              setState(1)
            }
        }
        finally {

        }
      }, []); 
    useEffect( () => {
        Auth()
    },[Auth])

    function changeBarber(receivedBarber: number) {
        setBarber(receivedBarber)
        setState(2);
    }
    function changeCorte(receivedCorte: { name: string, value: number }) {
        setCorte(receivedCorte.name)
        setValue(receivedCorte.value)
        setState(3);
    }
    function changeDay(receivedDay: string) {
        const convertedDay = dayjs(receivedDay).format('YYYY-MM-DD');;
        setDay(convertedDay);
        setState(4)
    }
    function changeHour (receivedHour: string) {
        setHour(receivedHour)
        setState(5)
    }


    if(state > 5) {
        setState(5)
    }
    if(state < 1) {
        setState(1)
    }

    useEffect(() => {
        if (state == 1) {
            setDay('');
            setHour('');
            setCorte('');
            setValue(0);
            setBarber(0);
        }
        if (state == 2) {
            setCorte('');
            setValue(0);
            setDay('');
            setHour('');
        }
        if (state == 3) {
            setDay('');
            setHour('');
        }
        if (state == 4) {
            setHour('');
        }
      }, [state]);

    return (
        <main>
            <Header></Header>
            <section className="flex w-4/5 gap-10 relative z-0 mt-10
        max-md:flex-col 
        max-md:w-full">

            <div className="w-[500px] max-lg:w-full bg-black text-whiteColor max-md:bg-[#0000009d] max-md:border-none
            rounded-md
            flex gap-5 mt-5 border border-zinc-800 p-5 relative
            max-sm:p-1
            max-md:h-[90vh]
            max-md:mt-0
            ">
                <div className='w-full flex flex-col h-full'>
                    <div className="w-full">
                        <Image src="/img/Logo.jpeg" alt="" className="border-b" width={200} height={200}/>
                    </div>
                    <div className='text-white flex flex-col items-center justify-center h-[50px]'>
                        <h1>
                            {state == 1 ? "barbeiros!" : ""}
                            {state == 2 ? "Cortes" : ""}
                            {state == 3 ? "Data" : ""}
                            {state == 4 ? "Horário" : ""}
                            {state == 5 ? "Aviso!" : ""}
                        </h1>
                    </div>
                    
                    {state == 1 ? (

                            <Barbeiro setBarber={changeBarber}></Barbeiro>

                    ) : ""}
                    {state == 2 ? (
                        
                            <Produtos products={Haircuts} setCorte={changeCorte}></Produtos>
                        
                    ) : ""}
                    {state == 3 ? (
                        
                            <Calendario setDay={changeDay}></Calendario>
                        
                    ) : ""}
                    {state == 4 ? (
                        
                            <Horarios toBack={() => setState(3)} barber={barber} day={day} setHour={changeHour}></Horarios>
                        
                    ) : ""}
                    {state == 5 ? (
                        
                            <Enviar feedbackController={(type, message) => feedbackController(type, message)} toBack={() => setState(1)} userId={userId} barber={barber} cliente={user} day={day} hour={hour} product={corte} value={value}></Enviar>
                
                    ) : ""}
                    
                </div>
                
            </div>
            </section>
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
        </main>
    );
}

function showFeedback(
    type: 'warning' | 'alert' | 'success',
    message: string
) {
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
