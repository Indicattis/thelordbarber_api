import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useProcess from "@/data/hooks/useProcess";
import { serverUrl } from "@/data/server/Config";
import dataDelete from "@/data/contexts/useDelete";
import animateJourney from "@/layout/animations/FadeUp";
import Image from "next/image";
import { IconCirclePlus, IconUser } from "@tabler/icons-react";
import Colaborador from "@/components/content/dashboard/utils/Barbeiro";
import Button from "@/components/button/Button";
import BarbeiroInfos from "@/components/content/dashboard/Colaboradores/BarbeiroInfos";
import Insights from "@/components/content/dashboard/Colaboradores/Insights";
import Maintence from "@/components/content/dashboard/Colaboradores/Maintence";
import CalendarioHorarios from "@/components/content/dashboard/Colaboradores/Calendario";
import ListagemHorarios from "@/components/content/dashboard/Colaboradores/ListagemHorarios";


type Barbeiro = {
    id: number;
    nome: string;
    login: string;
    idade: number;
    cargo: string;
    senha: string;
};

interface ColaboradoresProps {
    feedbackToggle: (type: 'alert' | 'warning' | 'success', message: any) => void
}

export default function Colaboradores(props: ColaboradoresProps) {
    const [data, setData] = useState<Barbeiro[]>([]);
    const [selectedBarbeiroId, setSelectedBarbeiroId] = useState<number | null>(null);
    const { processing, processInit, processEnd } = useProcess();
    const [day, setDay] = useState()

    const fetchData = useCallback ( async () => {
        processInit()
        try {
            const response = await axios.get(`${serverUrl}/barbeiros`);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
        finally {
            processEnd()
        }
    }, []);
    useEffect(() => {
        fetchData()
    }, [fetchData])

    function getData(barbeiroId: number) {
        setSelectedBarbeiroId(barbeiroId);
    }


    async function barberDel(id: number) {
        processInit()
        try {
            await dataDelete('barbeiro', id)
            await fetchData();
        }
        finally {
            setSelectedBarbeiroId(null);
            props.feedbackToggle('warning', 'Barbeiro deletado!');
            processEnd();
        }
    }

    async function barberGen() {
        processInit()
        try {
            await axios.post(`${serverUrl}/post-insert-barber`)
        }
        finally {
            props.feedbackToggle('success', 'Barbeiro criado!');
            processEnd();
            fetchData();
        }
    }

    async function getDay(day: any) {
        setDay(day)
    }
    
        
    
    return (
        <motion.div
            className=" w-full text-zinc-800 p-3 flex flex-col gap-5 font-sans"
            variants={animateJourney}
            initial="start"
            animate="visible"
            exit="end"
        >
            <div className="flex w-full h-full max-md:flex-col gap-5">
                <div className="flex flex-col gap-5 max-md:w-full bg-white p-3 rounded-md shadow">

                    {processing ? <Image alt="" src="/gif/Pulse-1s-244px.gif" width={50} height={0}/> : data.map((barbeiro) => (
                        <div
                            key={barbeiro.id}
                            className={`p-2 flex gap-5 w-full max-md:w-full
                            border rounded-md font-sans cursor-pointer transition-all
                            ${selectedBarbeiroId === barbeiro.id ? "bg-blue-100 border-blue-400 text-blue-500" : "border-zinc-100 text-zinc-800 bg-zinc-100"}
                            `}
                            onClick={() => getData(barbeiro.id)}
                        >
                            <IconUser />
                            <Colaborador font="sans">{barbeiro.nome}</Colaborador>

                        </div>
                    ))}

                    <div className="w-[200px] flex flex-col justify-center items-center border border-zinc-100 rounded-lg">
                        <Button variant="blue" onClick={barberGen}>
                            <IconCirclePlus />
                        </Button>
                    </div>
                    
                </div>
                <div className="w-full max-md:w-full bg-white p-3 rounded-md shadow">
                    {selectedBarbeiroId !== null && selectedBarbeiroId !== undefined ? (
                        <BarbeiroInfos
                            deleteBarber={barberDel}
                            key={selectedBarbeiroId}
                            barbeiro={selectedBarbeiroId}
                        />
                    ) : (
                        <div className="h-full w-full text-zinc-200 text-3xl flex items-center justify-center font-sans uppercase">Seja Bem Vindo!</div>
                    )}
                </div>
                {selectedBarbeiroId !== null && selectedBarbeiroId !== undefined ? (
                    <div className="w-1/2 max-md:w-full bg-white p-3 rounded-md shadow">
                        <Insights barberId={selectedBarbeiroId} />
                    </div>
                ) : ""}

            </div>
            {selectedBarbeiroId !== null && selectedBarbeiroId !== undefined ? (
                <Maintence id_barbeiro={selectedBarbeiroId}></Maintence>
            ) : ""} 
            {selectedBarbeiroId !== null && selectedBarbeiroId !== undefined ? (
                <div className="flex gap-5 w-full max-lg:flex-col">
                    <CalendarioHorarios sendParams={getDay} id_barbeiro={selectedBarbeiroId}></CalendarioHorarios>
                    <ListagemHorarios feedbackToggle={(type, message) => props.feedbackToggle(type,message)} barber={selectedBarbeiroId} day={day}></ListagemHorarios>

                </div>
            ) : ""} 
        </motion.div>
    );
}


interface ItemChildren {
    children: any;
    font?: string;
    color?: string;
}

function Item(props: ItemChildren) {
    return (
        <div
            className={`w-full 
        font-${props.font}
        text-${props.color}`}
        >
            {props.children}
        </div>
    );
}
