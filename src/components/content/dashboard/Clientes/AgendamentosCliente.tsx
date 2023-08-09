import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'; // Importe o plugin 'isSameOrAfter'
import { motion } from 'framer-motion';
import { Legend } from '@/components/content/dashboard/utils/Layout';
import HorarioAgendado from '@/components/content/dashboard/utils/Agendamento';
import animateJourney from '@/layout/animations/FadeUp';
import Agendamento from '@/data/Agendamento';
import Button from '@/components/button/Button';
import dataDelete from '@/data/contexts/useDelete';
import useProcess from '@/data/hooks/useProcess';
import Image from 'next/image';
import { serverUrl } from '@/data/server/Config';

interface AgendamentosClienteProps {
    clientePhone: number;
    feedbackToggle: (type: 'alert' | 'warning' | 'success', message: any) => void
}
dayjs.extend(customParseFormat);
dayjs.extend(LocalizedFormat);
dayjs.extend(isSameOrAfter); // Adicione o plugin 'isSameOrAfter'
dayjs.locale('pt-BR');

export default function AgendamentosCliente(props: AgendamentosClienteProps) {
    const [data, setData] = useState<Agendamento[]>([]);
    const [showPreviousDates, setShowPreviousDates] = useState(false);
    const { processing, processInit, processEnd } = useProcess();

    const fetchData = useCallback(async () => {
        try {
            processInit();
          const response = await axios.get(
            `${serverUrl}/agendamentos-cliente`,
            {
              params: {
                cliente: props.clientePhone,
              },
            }
          );
          setData(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          processEnd();
        }
      }, [props.clientePhone, deleteHorario]);

      useEffect(() => {
          fetchData()
      },[props.clientePhone])

    async function deleteHorario(receivedHorarioId: number) {
        processInit()
        try {
            await dataDelete('agendamento', receivedHorarioId);
        }
        finally {
            fetchData()
            props.feedbackToggle('alert', 'Agendamento excluído!')
            processEnd()
        }
    }

    const currentDate = dayjs();

    const filteredData = showPreviousDates
        ? data
        : data.filter(
              (agendamento) =>
                  dayjs(agendamento.day).isSameOrAfter(currentDate, 'day') // Utilize o método 'isSameOrAfter'
          );

    return (
        <motion.div
            className="w-full bg-white text-zinc-800 rounded-md shadow p-5 flex flex-col gap-5 font-sans"
            variants={animateJourney}
            initial="start"
            animate="visible"
            exit="end"
        >
            <Legend>Agendamentos do Cliente</Legend>
            {processing ? <Image alt="" src="/gif/Pulse-1s-244px.gif" width={50} height={0}/> : 
            filteredData.map((agendamento) => (
                <HorarioAgendado
                    id_cliente={agendamento.id_cliente}
                    key={agendamento.id}
                    barber={agendamento.id_barbeiro}
                    cliente={agendamento.cliente}
                    day={agendamento.day}
                    hour={agendamento.hour}
                    deleteHorario={deleteHorario}
                    id={agendamento.id}
                    product={agendamento.product}
                    value={agendamento.value}
                />
            ))}

            <Button
                variant="light"
                onClick={() => setShowPreviousDates(!showPreviousDates)}
            >
                {showPreviousDates
                    ? 'Ocultar agendamentos anteriores'
                    : 'Mostrar agendamentos anteriores'}
            </Button>
        </motion.div>
    );
}
