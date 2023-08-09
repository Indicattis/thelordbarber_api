import animateJourney from "@/layout/animations/FadeUp"
import { motion } from "framer-motion"
import SenhaCliente from "@/components/content/dashboard/Conta/ClienteSenha";
import ClienteInfos from "@/components/content/dashboard/Conta/ClienteInfos";


interface MinhaContaProps {
    cargo: string
    name: string
    barber_id: number
    login: string
    imagem: string
    feedbackToggle: (type: 'alert' | 'warning' | 'success', message: any) => void
}

export default function MinhaConta(props: MinhaContaProps) {

    return (
        <motion.div
            className="w-full text-zinc-800  flex flex-col gap-5 font-sans"
            variants={animateJourney}
            initial="start"
            animate="visible"
            exit="end"
        >
                <ClienteInfos imagem={props.imagem} barber_id={props.barber_id} login={props.login} cargo={props.cargo} name={props.name}></ClienteInfos>
                <SenhaCliente feedbackToggle={(type, message) => props.feedbackToggle(type,message)} barber_id={props.barber_id} />
        </motion.div>
    )
}