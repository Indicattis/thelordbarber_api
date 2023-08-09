import Button from "@/components/button/Button";
import { useState } from "react";
import { motion } from "framer-motion";
import animateJourney from "@/layout/animations/FadeUp";
import Image from "next/image";

interface CelularProps {
    sendCliente: (cliente: number) => void
}

export default function Celular(props:CelularProps) {
    const [phone, setPhone] = useState('');

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        // Remove tudo exceto números
        const phoneNumbers = value.replace(/[^0-9]/g, '');

        // Aplica a máscara de telefone com o padrão de DDD do Brasil (XX) XXXXX-XXXX
        let formattedPhone = '';
        if (phoneNumbers.length <= 2) {
            formattedPhone = phoneNumbers;
        } else if (phoneNumbers.length <= 7) {
            formattedPhone = `(${phoneNumbers.slice(0, 2)}) ${phoneNumbers.slice(2)}`;
        } else if (phoneNumbers.length <= 11) {
            formattedPhone = `(${phoneNumbers.slice(0, 2)}) ${phoneNumbers.slice(2, 7)}-${phoneNumbers.slice(7)}`;
        } else {
            formattedPhone = `(${phoneNumbers.slice(0, 2)}) ${phoneNumbers.slice(2, 7)}-${phoneNumbers.slice(7, 11)}`;
        }

        setPhone(formattedPhone);
    };

    const handleButtonClick = () => {
        const phoneNumber = parseInt(phone.replace(/[^0-9]/g, ''));
        if (!isNaN(phoneNumber) && phone.replace(/[^0-9]/g, '').length === 11) {
            // Verifica se o número de telefone não é um NaN e tem 11 dígitos
            props.sendCliente(phoneNumber)
        } else {
            // Valor do telefone é inválido
            // Exiba uma mensagem de erro ou tome outra ação apropriada
            console.log('Valor do telefone inválido');
        }
    };

    const isButtonDisabled = isNaN(parseInt(phone.replace(/[^0-9]/g, ''))) || phone.replace(/[^0-9]/g, '').length !== 11;

    return (
        <motion.div
            className="w-1/2 max-md:w-full p-5 h-full flex flex-col justify-center bg-darkTheme 
            rounded-md border border-zinc-800 text-white"
            variants={animateJourney}
            initial="start"
            animate="visible"
            exit="end"
        >
                <Image className="w-56" src="/img/logoNew2.png" alt="" width={1000} height={1000}/>

            <div className="flex flex-col gap-5 font-poppins w-full">
                <legend className="font-senthir text-white">Telefone</legend>
                <input
                    type="text"
                    id="tel--number"
                    placeholder="(**) *****-****"
                    onChange={handlePhoneChange}
                    value={phone}
                    className="bg-black border border-zinc-800 rounded-sm text-white outline-none p-2 w-full"
                />
                <Button variant="green" onClick={handleButtonClick} disabled={isButtonDisabled}>
                    <b>Consultar</b>
                </Button>
            </div>
            
        </motion.div>
    );
}
