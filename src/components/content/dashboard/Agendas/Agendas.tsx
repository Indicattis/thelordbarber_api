import AgendasColaboradores from "@/components/content/dashboard/Agendas/Colaboradores"
import DashboardCalendario from "@/components/content/dashboard/Agendas/DashboardCalendario"
import ListagemAgendamentos from "@/components/content/dashboard/Agendas/ListagemAgendamentos"
import animateJourney from "@/layout/animations/FadeUp"
import dayjs from "dayjs"
import { motion } from "framer-motion"
import { useState } from "react"

interface DashboardAgendasProps {
    
    feedbackToggle: (type: 'alert' | 'warning' | 'success', message: any) => void
}

export default function  DashboardAgendas(props: DashboardAgendasProps) {
    const [barber, setBarber] = useState<number>(0)
    const currentDate = dayjs().format('YYYY-MM-DD');
    const [day, setDay] = useState<any>(currentDate)


    function changeDay(receivedDay: string) {
        setDay(receivedDay)
    }
    function changeBarber (receivedBarber: number) {
        setBarber(receivedBarber)
    }
    return (
        <motion.div
            className=" w-full text-zinc-800  flex flex-col gap-5 font-sans"
            variants={animateJourney}
            initial="start"
            animate="visible"
            exit="end"
        >

            <div className="flex w-full max-2xl:flex-col gap-5">
                <div className="min-w-max max-2xl:w-full">
                    <AgendasColaboradores sendBarber={changeBarber}/>
                </div>
                {barber > 0 && (
                    <div className="w-full">
                        <DashboardCalendario receivedId={barber} sendParams={changeDay}></DashboardCalendario>
                    </div>
                )}
                {day !== "" && (
                    <div className="w-full">
                        <ListagemAgendamentos feedbackToggle={(type, message) => props.feedbackToggle(type,message)} barber={barber} day={day}></ListagemAgendamentos>
                    </div>
                )}
                
            </div>
        </motion.div>
    )
}