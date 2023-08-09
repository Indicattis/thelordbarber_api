import { IconX } from "@tabler/icons-react";
import Button from "@/components/button/Button";
import { motion } from "framer-motion"
import animateJourney from "@/layout/animations/FadeUp";


export interface FeedBackProps{
    message: string
    type: 'warning' | 'alert' | 'success'
    onClick?: () => void
}

export default function FeedBack( {message, type, onClick}: FeedBackProps) {
    let config = ''
    if (type == "alert") config = 'bg-yellow-500';
    if (type == "warning") config = 'bg-red-500';
    if (type == "success") config = 'bg-green-500';

    // Função para remover o componente após 5 segundos
    const removeComponent = () => {
        // Chamando a função onClick, se fornecida
        if (onClick) onClick();
    };

    // Atrasando a remoção do componente em 5 segundos
    setTimeout(removeComponent, 2000);

    return (
        <motion.div className={`feedback p-3`}
        variants={animateJourney}
        initial="start"
        animate="visible"
        exit="end"
        transition={{ duration: 5 }}
    >
        <div className={`rounded-sm text-white w-[300px] max-md:w-full
        flex justify-center items-center font-sans h-14 relative
        ${config}`}>
            <div className="w-full text-center">
                {message}
            </div>
            <div className="absolute right-3">
                <Button variant="default" onClick={onClick}><IconX/></Button>
            </div>
        </div>
        </motion.div>
    )
}

