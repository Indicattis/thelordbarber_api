import axios from "axios";
import { Legend } from "@/components/content/dashboard/utils/Layout";
import { motion } from "framer-motion";
import animateJourney from "@/layout/animations/FadeUp";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from "dayjs/plugin/customParseFormat";
import 'dayjs/locale/pt-br';
import Agendamento from "@/data/Agendamento";
import { IconAlarm, IconArrowBigRight, IconArrowNarrowRight, IconArrowRightCircle } from "@tabler/icons-react";
import useProcess from "@/data/hooks/useProcess";
import Image from "next/image";
import {BarberName} from "@/data/server/convert";
import { serverUrl } from "@/data/server/Config";
import HorarioAgendado from "@/components/content/dashboard/utils/Agendamento";

dayjs.extend(customParseFormat);
dayjs.extend(LocalizedFormat);
dayjs.locale('pt-BR');

export default function DashboardPainel() {
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const { processing, processInit, processEnd } = useProcess()
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                processInit()
                const response = await axios.get(`${serverUrl}/agendamentos-dia/${today.format('YYYY-MM-DD')}`);
                setAgendamentos(response.data);
            } catch (error) {
                console.error('Erro ao buscar os agendamentos:', error);
            }
            finally {
                processEnd()
            }
        };

        fetchAppointments();
    }, []);


    const categorizeAppointments = () => {
        const anterior:any = [];
        const agora:any = [];
        const proximo:any = [];

        agendamentos.forEach((agendamento) => {
            const agendamentoHora = dayjs(agendamento.hour, 'HH:mm'); // Considerando que 'horario' é uma string no formato 'HH:mm'

            const agendamentoHoraFinal = agendamentoHora.add(40, 'minute');

            if (agendamentoHoraFinal.isBefore(currentDate, 'minute')) {
                anterior.push(agendamento);
            } else if (agendamentoHora.isAfter(currentDate, 'minute')) {
                proximo.push(agendamento);
            } else {
                agora.push(agendamento);
            }
        });

        return { anterior, agora, proximo };
    };
    const { anterior, agora, proximo } = categorizeAppointments();
    const [groups, setGroups] = useState(categorizeAppointments());



    const updateAppointments = () => {
        const updatedGroups = categorizeAppointments();
        setGroups(updatedGroups);
    };

    useEffect(() => {
        updateAppointments();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
          const agendamentoAtual = agora.find((agendamento: any) => {
            const agendamentoHora = dayjs(agendamento.hour, 'HH:mm');
            const agendamentoHoraFinal = agendamentoHora.add(40, 'minute');
            return agendamentoHora.isBefore(currentDate, 'minute') && agendamentoHoraFinal.isAfter(currentDate, 'minute');
          });
    
          if (agendamentoAtual) {
            const agendamentoHora = dayjs(agendamentoAtual.hour, 'HH:mm');
            const elapsedMinutes = currentDate.diff(agendamentoHora, 'minute');
            setProgress(Math.max(0, Math.min(40, elapsedMinutes)));
          } else {
            setProgress(0);
          }
        }, 1000);
    
        return () => clearInterval(intervalId);
      }, [currentDate, agora]);


    return (
        <motion.div
            className="w-full bg-white text-zinc-800 rounded-md shadow p-5 flex flex-col font-sans"
            variants={animateJourney}
            initial="start"
            animate="visible"
            exit="end"
        >
            <Legend>Painel de Horários</Legend>
            
            <div className="absolute right-5">
                <Image className="rounded-full" alt="" src="/img/vetor.png" width={35} height={35}></Image>
            </div>
            <ProgressBar progress={progress} />
            <div className="w-full flex justify-center py-1 text-sm gap-5 max-md:flex-col">
                {/* Renderizar os agendamentos de cada grupo */}
                <div className="w-full rounded-md flex flex-col gap-3 items-center">
                    <div className="w-full bg-white flex items-center gap-5 p-1 ">
                        <div className="w-full text-xl uppercase font-semibold">Realizados</div>
                    </div>
                    {processing ? <Image alt="" src="/gif/Pulse-1s-244px.gif" width={50} height={0}/> : 
                    anterior.map((agendamento: any) => (
                        <HorarioAgendado
                        barber={agendamento.id_barbeiro}
                        id_cliente={agendamento.id_cliente}
                        day={agendamento.day}
                        hour={agendamento.hour}
                        product={agendamento.product}
                        cliente={agendamento.cliente}
                        value={agendamento.value}
                        key={agendamento.id}
                        deleteHorario={() => updateAppointments}
                        id={agendamento.id}
                        />
                    )).reverse()}
                </div>
                <div className="w-full rounded-md flex flex-col gap-3">
                    <div className="w-full bg-white flex items-center gap-5 p-1 ">
                        <div className="w-full text-xl uppercase font-semibold">Agora</div>
                    </div>
                    {processing ? <Image alt="" src="/gif/Pulse-1s-244px.gif" width={50} height={0}/> : 
                    agora.map((agendamento: any) => (
                        <div key={agendamento.id} className="w-full flex items-center gap-5  rounded-md overflow-hidden border  cursor-pointer hover:bg-zinc-100 transition-all">
                            <div className="px-3 py-2 h-full text-white bg-green-500 flex items-center">{agendamento.hour}</div>
                            <div>{agendamento.id_cliente}</div>
                            <div><IconArrowNarrowRight/></div>
                            <div className="w-full"><BarberName id={agendamento.id_barbeiro}/></div>
                        </div>
                    ))}
                </div>
                <div className="w-full rounded-md flex flex-col gap-3">
                    <div className="w-full bg-white flex items-center gap-5 p-1 ">
                        
                        <div className="w-full text-xl uppercase font-semibold">Próximos</div>
                    </div>
                    {processing ? <Image alt="" src="/gif/Pulse-1s-244px.gif" width={50} height={0}/> : 
                    proximo.map((agendamento: any) => (
                        <div key={agendamento.id} className="w-full flex items-center gap-5  rounded-md overflow-hidden border  cursor-pointer hover:bg-zinc-100 transition-all">
                            <div className="px-3 py-2 h-full text-white bg-blue-500 flex items-center">{agendamento.hour}</div>
                            <div>{agendamento.id_cliente}</div>
                            <div><IconArrowNarrowRight/></div>
                            <div className="w-full"><BarberName id={agendamento.id_barbeiro}/></div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}


const ProgressBar = ({ progress }: { progress: number }) => {
    return (
      <div className="h-1 w-full relative bg-gray-100 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-1  bg-green-400"
          style={{ width: `${(progress / 40) * 100}%` }}
        />
      </div>
    );
  };