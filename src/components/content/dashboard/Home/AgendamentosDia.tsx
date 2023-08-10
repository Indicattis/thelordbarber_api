import axios from "axios";
import { Box, Legend } from "@/components/content/dashboard/utils/Layout";
import Agendamento from "@/data/Agendamento";
import { useCallback, useEffect, useState } from "react";

import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import HorarioAgendado from "@/components/content/dashboard/utils/Agendamento";
import dataDelete from "@/data/contexts/useDelete";
import useProcess from "@/data/hooks/useProcess";
import Image from "next/image";
import { serverUrl } from "@/data/server/Config";


interface AgendamentosDiaProps {
    feedbackToggle: (type: 'alert' | 'warning' | 'success', message: any) => void
}

export default function AgendamentosDia(props: AgendamentosDiaProps) {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const { processing, processInit, processEnd } = useProcess()

    const currentDate = dayjs();

    const [today, setToday] = useState(currentDate);
    
    const fetchData = useCallback (async () => {
        try {
            processInit()
            const response = await axios.get(`${serverUrl}/agendamentos-dia/${today.format('YYYY-MM-DD')}`);
            setAgendamentos(response.data);
        } catch (error) {
            console.log(error);
        }
        finally {
            processEnd()
        }
    },[dataDelete]);

    useEffect(() => {
        fetchData()
    }, [fetchData])

    function deleteHorario(receivedHorarioId: number) {
        dataDelete('agendamento', receivedHorarioId);
        props.feedbackToggle('alert', 'Horário excluído');
        fetchData();
    }
    return (
        <Box>
            <Legend>Agendamentos do dia</Legend>
            <div className="w-full flex flex-col gap-5">
            {processing ? <Image alt="" src="/gif/Pulse-1s-244px.gif" width={50} height={0}/> : 
            agendamentos.map(agendamento => (
                <HorarioAgendado
                barber={agendamento.id_barbeiro}
                cliente={agendamento.cliente}
                id_cliente={agendamento.id_cliente}
                day={agendamento.day}
                hour={agendamento.hour}
                id={agendamento.id}
                product={agendamento.product}
                value={agendamento.value}
                key={agendamento.id}
                deleteHorario={deleteHorario}/>
            ))}

            </div>
        </Box>
    )
}