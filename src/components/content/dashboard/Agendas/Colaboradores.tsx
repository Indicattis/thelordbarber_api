
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { IconUser } from "@tabler/icons-react";
import useProcess from "@/data/hooks/useProcess";
import { serverUrl } from "@/data/server/Config";
import { Box, Legend } from "@/components/content/dashboard/utils/Layout";
import Colaborador from "@/components/content/dashboard/utils/Barbeiro";
import Barbeiro from "@/data/Barbeiros";
import axios from "axios";

interface AgendasColaboradoresProps {
    sendBarber: (id: number) => void
}


export default function AgendasColaboradores(props:AgendasColaboradoresProps) {
    
    const [selectedBarberID, setSelectedBarberID] = useState<number>(0); 
    const [data, setData] = useState<Barbeiro[]>([]);
    const { processing, processInit, processEnd } = useProcess()
    
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                processInit()
                const response = await axios.get(`${serverUrl}/barbeiros`);
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
            
            finally {
                processEnd()
            }
        };

        fetchData();
    }, []);


    function selectBarber (selectBarberId: number) {
        setSelectedBarberID(selectBarberId)
        props.sendBarber(selectBarberId)
    }


    return (
        <Box>
            <Legend>Colaboradores</Legend>
            <div className="w-full text-zinc-800 gap-5 font-sans flex flex-col">
            {processing ? (
                <Image alt="" src="/gif/Pulse-1s-244px.gif" width={50} height={0}/>
                ) : 
                data.map((barbeiro) => (
                <div
                    key={barbeiro.id}
                    className={`p-2 flex gap-5 w-full max-md:w-full
                    border rounded-md font-sans cursor-pointer transition-all
                        ${selectedBarberID === barbeiro.id ? "bg-blue-100 border-blue-400 text-blue-500" : "border-zinc-100 text-zinc-800 "}
                                `}
                    onClick={() => selectBarber(barbeiro.id)}
                >
                    <IconUser />
                    <Colaborador font="sans">{barbeiro.nome}</Colaborador>
                </div>
            ))}
            </div>
        </Box>
    )
}