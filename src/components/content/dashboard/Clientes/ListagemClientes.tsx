import { IconBrandWhatsapp, IconUser, IconVip, IconVipOff } from "@tabler/icons-react";
import axios from "axios";
import Button from "@/components/button/Button";
import Cliente from "@/components/content/dashboard/utils/Cliente";
import { Legend } from "@/components/content/dashboard/utils/Layout";
import Clientes from "@/data/Clientes";
import useProcess from "@/data/hooks/useProcess";
import { serverUrl } from "@/data/server/Config";
import { motion } from "framer-motion"
import animateJourney from "@/layout/animations/FadeUp"
import Image from "next/image";
import { useEffect, useState } from "react";


interface ListagemClientesProps {
    sendClienteId: (id: number, phone: number) => void
}

export default function ListagemClientes(props: ListagemClientesProps) {
    const [data, setData] = useState<Clientes[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { processing, processInit, processEnd } = useProcess();

    
    useEffect(() => {
    const fetchData = async () => {
        try {
            processInit();
            const response = await axios.get(`${serverUrl}/clientes`);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
        finally {
          processEnd();
        }
    };

    fetchData();
    }, [currentPage]);

    return (
        
        <motion.div
            className=" w-full bg-white text-zinc-800 rounded-md shadow p-5 flex flex-col gap-5 font-sans"
            variants={animateJourney}
            initial="start"
            animate="visible"
            exit="end"
        >
        <div className="font-semibold text-2xl w-full flex items-center flex-col">
            <Legend>Usuários</Legend>
            <div className="flex w-full font-normal text-lg gap-2 items-center">
            <input
            className="w-full border-b outline-none p-2"
                type="text"
                placeholder="Buscar"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className="">
                <Button variant="blue" onClick={() => setSearchValue("")}>
                    Limpar
                </Button>
            </div>
        </div>
        </div>
        
            {processing ? <Image alt="" src="/gif/Pulse-1s-244px.gif" width={50} height={0} /> : 
            data.filter((cliente) => {
                const searchLower = searchValue.toLowerCase();
                return (
                    cliente.name.toLowerCase().includes(searchLower) ||
                    cliente.phone.toString().includes(searchValue) ||
                    cliente.recurrence.toString().includes(searchValue)
                );
            })
            .slice((currentPage - 1) * 8, currentPage * 8)
            .map((cliente) => (
                <div
                    key={cliente.id}
                    className={`p-2 flex gap-5 w-full items-center
                                 rounded-md font-poppins cursor-pointer
                                text-base bg-zinc-100 text-zinc-800 transition-all
                                hover:bg-zinc-200`}
                    onClick={() => props.sendClienteId(cliente.id, cliente.phone)}
                >
                    <Cliente
                    id={cliente.id}
                    name={cliente.name}
                    phone={cliente.phone}
                    recurrence={cliente.recurrence}
                    />
                </div>
            ))}
            <div className="flex justify-center mt-5 gap-5">
            <Button
                variant="light"
                onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                disabled={currentPage === 1}
            >
                Anterior
            </Button>
            <Button
                variant="light"
                onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                disabled={currentPage === Math.ceil(data.length / 5)}
            >
                Próxima
            </Button>
        </div>
        </motion.div>
    )
}