import axios from "axios";
import { useEffect, useState } from "react";


import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import customParseFormat from "dayjs/plugin/customParseFormat"
import 'dayjs/locale/pt-br';
import dayjs from "dayjs";
import Button from "@/components/button/Button";
import { IconArrowNarrowLeft, IconDotsVertical, IconMessageDots } from "@tabler/icons-react";
import Agendamento from "@/data/Agendamento";
import Image from "next/image";
import { BarberName } from "@/data/server/convert";
import { serverUrl } from "@/data/server/Config";
import ExpandDown from "@/utils/ExpandDown";
import useProcess from "@/data/hooks/useProcess";
import dataDelete from "@/data/contexts/useDelete";


dayjs.extend(customParseFormat)
dayjs.extend(LocalizedFormat)
dayjs.locale('pt-BR')




interface HorariosProps {
    cliente: number | undefined
}


export default function HorariosUsuario(props: HorariosProps) {
    const [data, setData] = useState<Agendamento[]>([]);
    const { processing, processInit, processEnd } = useProcess();

    useEffect(() => {
        processInit()
        const fetchData = async () => {
            try {
                const response = await axios.get(`${serverUrl}/agendamentos-cliente`, {
                    params: { 
                        cliente: props.cliente
                  },
                  });
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
            finally{
                processEnd()
            }
        };

        fetchData();
    }, [props.cliente, dataDelete]);

    
    return (
        <div className="w-[600px] flex flex-col gap-3 max-md:w-full">
            {processing ? <Image alt="" src="/gif/Pulse-1s-244px.gif" width={50} height={50}/> : (
                data.sort((a, b) => b.id - a.id) // Ordenar por ID em ordem decrescente
                .map((agendamento) => (
                    <Horario 
                    key={agendamento.id}
                    id_cliente={agendamento.id_cliente}
                    day={dayjs(agendamento.day).add(1, "day")}
                    hour={agendamento.hour}
                    id={agendamento.id}
                    id_barbeiro={agendamento.id_barbeiro}
                    value={agendamento.value}
                    product={agendamento.product}
                    onClick={() => dataDelete('agendamento', agendamento.id)}
                    />
                ))
            )}
            
            
        </div>
    )
}

interface HorarioProps {
    id: number,
    day: any,
    hour: any,
    product: string,
    value: number,
    id_barbeiro: number,
    id_cliente: number | undefined,
    onClick: () => void
}

function Horario(props: HorarioProps) {
    const [active, setActive] = useState<boolean>(false)
    return (
        <div
            key={props.id}
            className={`p-2 flex flex-col w-full text-sm
                        border border-zinc-800 rounded-sm font-poppins cursor-pointer
                        max-md:text-sm bg-black text-white transition-all`}
        >
            <div className="w-full flex gap-5 items-center">
                <div className="">{dayjs(props.day).format("DD/MM/YYYY")}</div>
                <div>{props.hour}</div>
                <div className="font-senthir w-full text-zinc-800 max-md:hidden"><BarberName id={props.id_barbeiro}/></div>
                <div className="font-sans text-white max-md:hidden">R${props.value},00</div>
                <div>
                    <Button variant="default" onClick={() => setActive(!active)}>
                        <IconDotsVertical />
                    </Button>
                </div>
            </div>
            
            <ExpandDown active={active}>
                <div className="w-full flex flex-col gap-3 items-start">
                    <div className="w-full flex gap-3 max-md:flex-col">
                        <div className="rounded-sm p-1 w-full bg-darkTheme border border-zinc-800">ID: {props.id}</div>
                        <div className="rounded-sm p-1 w-full bg-darkTheme border border-zinc-800">Dia: {dayjs(props.day).format("DD [de] MMMM, YYYY")}</div>
                        <div className="rounded-sm p-1 w-full bg-darkTheme border border-zinc-800">Hora: {props.hour}</div>
                    </div>
                    <div className="rounded-sm p-1 w-full bg-darkTheme border border-zinc-800">Corte: {props.product}</div>
                    <div className="rounded-sm p-1 w-full bg-darkTheme border border-zinc-800">R${props.value},00</div>
                    <div className="w-full flex gap-3">
                        <Button variant="red">Cancelar Agendamento</Button>
                        <Button variant="blue" onClick={() => props.onClick}>Comprovante</Button>
                    </div>
                </div>
            </ExpandDown>
        </div>
    )
}