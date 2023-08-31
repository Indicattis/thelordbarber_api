import axios from 'axios';
import HorarioDisponivel from '@/components/content/dashboard/utils/Horario';
import { Box, Legend } from '@/components/content/dashboard/utils/Layout';
import Horario from '@/data/Horario';
import useProcess from '@/data/hooks/useProcess';
import { serverUrl } from '@/data/server/Config';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

interface ListagemAgendamentosProps {
    barber: number;
    day: any;
    feedbackToggle: (type: 'alert' | 'warning' | 'success', message: any) => void
}

export default function ListagemHorarios(props: ListagemAgendamentosProps) {
    const [data, setData] = useState<Horario[]>([]);
    const { processing, processInit, processEnd } = useProcess();

    const fetchData = useCallback(async () => {
        try {
            processInit();
            const response = await axios.get(
                `${serverUrl}/horarios-barbeiro-dia/${props.barber}/${props.day}`
            );
            setData(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            processEnd();
        }
    }, [props.barber, props.day]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const trocarDisponibilidadeHorario = async (id: number, level: boolean) => {
        processInit();
        let status = 0
        if (level == true) {status = 0} else {status = 1}
        console.log(status)
        try {
            const response = await axios.post(
                `${serverUrl}/horario-status`, {
                    id: id,
                    status: status
                }
            )
        }
        catch (error) {
            console.log(error);
        }
        finally {
            processEnd();
            fetchData();
            props.feedbackToggle('alert', 'Horário modificado!')
        }
    }

    return (
        <Box>
        <Legend>Horários Livres</Legend>
            <div className='w-full flex flex-col gap-1'>
            {processing || !props.day ? <Image alt="" src="/gif/Pulse-1s-244px.gif" width={50} height={0}/> : 
            data.map((horario) => (
                <HorarioDisponivel
                key={horario.id}
                day={horario.day}
                hour={horario.hour}
                status={horario.status}
                id={horario.id}
                id_barbeiro={horario.id_barbeiro}
                changeStatus={trocarDisponibilidadeHorario}/>
            ))}
            </div>
        </Box>
    );
}
