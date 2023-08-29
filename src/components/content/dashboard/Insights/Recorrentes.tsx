import { Legend } from "@/components/content/dashboard/utils/Layout";
import Clientes from "@/data/Clientes";
import useProcess from "@/data/hooks/useProcess";
import { serverUrl } from "@/data/server/Config";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";





export default function Recorrentes() {
    const [data, setData] = useState<Clientes[]>([]);
    const { processing, processInit, processEnd } = useProcess();
    const recurrencePrice = 135

    const fetchData = useCallback(async () => {
        processInit();
        try {
            const response = await axios.get(`${serverUrl}/insights-recurrence-users`);
            setData(response.data);
        } finally {
            processEnd();
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full flex flex-col gap-3">
            <Legend>Mensalistas</Legend>
            {processing ? <Image alt="" src="/gif/Pulse-1s-244px.gif" width={50} height={50}/> : (
                data.map((recorrente: any, index: number) => (
                    <div key={index} className="w-full flex bg-zinc-100 rounded-md items-center gap-3 overflow-hidden">
                        <div className="bg-blue-400 text-white p-2">BRL{recurrencePrice}.00</div>
                        <div className="w-full">{recorrente.name}</div>
                        
                    </div>
                ))
            )}
            <div className="w-full flex gap-3 rounded-md overflow-hidden items-center bg-zinc-100">
                <div className="bg-green-400 text-white p-2">
                    BRL{data.length * recurrencePrice}.00
                </div>
                <div className="w-full">
                    TOTAL
                </div>
            </div>
        </div>
    );
}






