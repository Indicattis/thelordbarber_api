import { IconCircleCheck, IconExclamationCircle, IconExclamationMark } from "@tabler/icons-react";
import axios from "axios";
import Button from "@/components/button/Button";
import { motion } from "framer-motion";
import animateJourney from "@/layout/animations/FadeUp";
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br';
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import Display from "@/components/content/requirepage/Display";
import { useState } from "react";
import { serverUrl } from "@/data/server/Config";

interface EnviarProps {
    cliente: number,
    day: string,
    hour: string,
    product: string,
    value: number,
    barber: number | null
    userId: number
    toBack: () => void;
    feedbackController: (type: "warning" | "alert" | "success", message: string) => void
}

dayjs.extend(customParseFormat)
dayjs.extend(LocalizedFormat)
dayjs.locale('pt-BR')


export default function Enviar(props: EnviarProps) {

    const [isEnd, setEnd] = useState<boolean>(false)

    const handleCadastro = async () => {
        const { cliente, day, hour, product, value, barber, userId } = props;
        const data = { cliente, day, hour, product, value, barber, userId };
        
        await axios.post(`${serverUrl}/post-insert-agendamento`, data)
            .then(response => {
                console.log('Cadastro realizado com sucesso:', response.data);
                props.feedbackController('success', 'Agendamento realizado!')
                setEnd(true)
                sendFeedBack()
            })
            .catch(error => {
                console.error('Erro ao cadastrar:', error);
            });
    };

    const sendFeedBack = async () => {
        await axios.get(`${serverUrl}/send-message`)
        .then(response => {
            console.log('Feedback enviado!', response.data);
        })
        .catch(error => {
            console.error('Erro ao cadastrar:', error);
        });
    }

    function relocate(pathName: string) {
        window.location.pathname = pathName;
      }

    if (props.cliente === null || props.day === null || props.hour === null || props.product === null || props.value === null || props.barber === null ||
        props.cliente === 0 || props.day === '' || props.hour === '' || props.product === '' || props.value === 0 || props.barber === 0) {
        return (
            <div className='w-full'>

            <motion.div className='w-full flex flex-col items-center justify-center gap-5 h-full'
                variants={animateJourney}
                initial="start"
                animate="visible"
                exit="end">
                <div className='text-red-500'>
                    <IconExclamationCircle width={240} height={240} />
                </div>
                <div className='text-sm justify-center items-center font-poppins flex gap-3 italic'>
                    <IconExclamationMark className='border rounded-full' />
                    Preencha todos os passos anteriores!
                </div>
                <Button onClick={props.toBack} variant='red'>Voltar</Button>

            </motion.div>
        </div>
        );
    }
    

    return (
        <div className='w-full'>

            <motion.div className='w-full flex flex-col items-center justify-center gap-5 h-full'
                variants={animateJourney}
                initial="start"
                animate="visible"
                exit="end">
                {isEnd ? (
                    <div className='text-green-500'>
                        <IconCircleCheck width={140} height={140} />
                    </div>
                ) : ("")}
                <div className='text-sm justify-center items-center font-poppins flex gap-3 italic'>
                    <IconExclamationMark className='border rounded-full' />
                    Confira seus dados!
                </div>
                <div className="w-full">
                    <Display barber={props.barber} user={props.cliente} day={props.day} hour={props.hour} products={props.product} value={props.value}></Display>
                </div>
                {!isEnd ? (
                    <div className="w-full flex gap-5">
                        <Button onClick={props.toBack} variant='red'>Voltar</Button>
                        <Button onClick={handleCadastro} variant='green'>Agendar</Button>
                    </div>
                ) : (
                    <div className="w-full flex gap-5">
                        <Button onClick={() => window.location.href = '/usuario'} variant='blue'>Minha página</Button>
                        <Button onClick={() => window.location.href = '/'} variant='green'>Voltar a home</Button>
                    </div>
                )}
                

            </motion.div>
        </div>
    )
}