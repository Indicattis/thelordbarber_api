import animateJourney from "@/layout/animations/FadeUp"
import { motion } from "framer-motion"
import Acount from "@/components/content/dashboard/Conta/Acount";
import ChangePassword from "@/components/content/dashboard/Conta/ChangePassword";


interface MyAcountProps {
    cargo: string
    name: string
    barber_id: number
    login: string
    imagem: string
    feedbackToggle: (type: 'alert' | 'warning' | 'success', message: any) => void
}

export default function MyAcount(props: MyAcountProps) {

    return (
        <motion.div
            className="w-full text-zinc-800  flex flex-col gap-5 font-sans"
            variants={animateJourney}
            initial="start"
            animate="visible"
            exit="end"
        >
                <Acount imagem={props.imagem} barber_id={props.barber_id} login={props.login} cargo={props.cargo} name={props.name}></Acount>
                <ChangePassword feedbackToggle={(type, message) => props.feedbackToggle(type,message)} barber_id={props.barber_id} />
        </motion.div>
    )
}