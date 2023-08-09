import { IconBusinessplan, IconRazorElectric } from '@tabler/icons-react';
import axios from 'axios';
import HorarioAgendado from '@/components/content/dashboard/utils/Agendamento';
import { Box, Legend } from '@/components/content/dashboard/utils/Layout';
import Agendamento from '@/data/Agendamento';
import dataDelete from '@/data/contexts/useDelete';
import useProcess from '@/data/hooks/useProcess';
import { serverUrl } from '@/data/server/Config';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

interface ListagemAgendamentosProps {
    barber: number;
    day: any;
    feedbackToggle: (type: 'alert' | 'warning' | 'success', message: any) => void
}

export default function ListagemAgendamentos(props: ListagemAgendamentosProps) {
    const [data, setData] = useState<Agendamento[]>([]);
    const [totalValue, setTotalValue] = useState<number>(0);
    const { processing, processInit, processEnd } = useProcess();

    const fetchData = useCallback(async () => {
        try {
            processInit();
            const response = await axios.get(
                `${serverUrl}/agendamentos-barbeiro-dia/${props.barber}/${props.day}`
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

    useEffect(() => {
        const calculateTotalValue = () => {
            const sum = data.reduce(
                (accumulator, item) => accumulator + item.value,
                0
            );
            setTotalValue(sum);
        };

        calculateTotalValue();
    }, [data]);

    async function deleteHorario(receivedHorarioId: number) {
        try {
            processInit();
            await dataDelete('agendamento', receivedHorarioId);
            fetchData();
        }
        finally{
            processEnd();
            props.feedbackToggle('success', 'Agendamento excluído!')
            
        }
    }


    return (
        <Box>
            <Legend>Agendamentos</Legend>
            {processing ? <Image alt="" src="/gif/Pulse-1s-244px.gif" width={50} height={0}/> : 
            data.map((horario) => (
                <HorarioAgendado
                    id_cliente={horario.id_cliente}
                    key={horario.id}
                    deleteHorario={deleteHorario}
                    id={horario.id}
                    cliente={horario.cliente}
                    product={horario.product}
                    day={horario.day}
                    hour={horario.hour}
                    value={horario.value}
                    barber={horario.id_barbeiro}
                />
            ))}
            <div className="w-full flex items-center justify-around border border-zinc-100">
                <div className="p-2 flex items-center gap-5">
                    <IconBusinessplan></IconBusinessplan>
                </div>
                <div className="w-full flex items-center gap-5">Total</div>
                <div className="font-bold p-2 text-white bg-blue-400">
                    BRL{totalValue}.00
                </div>
            </div>
        </Box>
    );
}
