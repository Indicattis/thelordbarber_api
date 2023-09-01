import { Legend } from "@/components/content/dashboard/utils/Layout";
import Clientes from "@/data/Clientes";
import useProcess from "@/data/hooks/useProcess";
import { serverUrl } from "@/data/server/Config";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";



interface ChartData {
    day: string;
    revenue: number;
}

const mapDayCodeToName = (dayCode: string) => {
    const dayNames: any = {
        dom: "Domingo",
        seg: "Segunda",
        ter: "Terça",
        qua: "Quarta",
        qui: "Quinta",
        sex: "Sexta",
        sab: "Sábado"
    };
    return dayNames[dayCode] || "";
};

export default function Recorrentes() {
    const [data, setData] = useState<Clientes[]>([]);
    const { processing, processInit, processEnd } = useProcess();
    const recurrencePrice = 135
    const [chartData, setChartData] = useState<ChartData[]>([]);

    const fetchData = useCallback(async () => {
        processInit();
        try {
            const response = await axios.get(`${serverUrl}/insights-recurrence-users`);
            setData(response.data)
            const userData = response.data;
            const daysOfWeek = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];

            const dataByDay = daysOfWeek.map(dayCode => {
                const usersForDay = userData.filter((user: any) => user.recurrence_day === dayCode);
                const revenueForDay = usersForDay.length * recurrencePrice;
                return { day: mapDayCodeToName(dayCode), revenue: revenueForDay };
            });

            setChartData(dataByDay);
        } finally {
            processEnd();
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="w-full flex flex-col gap-5">
            <Legend>Mensalistas</Legend>
            <div className="w-full flex gap-3 uppercase font-semibold">
                    faturamento: BRL{data.length * recurrencePrice}.00
            </div>
            
            <div className="w-full max-md:hidden">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day"/>
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="revenue" name="Faturamento" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="hidden flex-col gap-1 w-full max-md:flex">
                {chartData.map((cliente, index) => (
                    <div className="flex items-center gap-3 w-full" key={index}>
                        <div className="w-24 h-8 flex items-center rounded-full font-semibold">
                            {cliente.day}
                        </div>
                        <progress value={cliente.revenue} max={1040} key={index}
                            className="custom-progress"></progress>
                        <div className="w-[130px] font-semibold rounded-full text-center">
                            BRL{cliente.revenue}.00
                        </div>
                    </div> 
                ))}
            </div>
            
            <div className="grid grid-cols-6 gap-3 
            max-lg:grid-cols-4
            max-md:grid-cols-2
            max-sm:grid-cols-1">

            {processing ? <Image alt="" src="/gif/Pulse-1s-244px.gif" width={50} height={50}/> : (
                data.map((recorrente: any, index: number) => (
                    <div key={index} className="w-full flex flex-col overflow-hidden shadow rounded-sm">
                        <div className="w-full h-12 px-2 bg-zinc-100">{recorrente.name}</div>
                        <div className="text-sm w-full px-2">{recorrente.phone}</div>
                        <div className="uppercase w-full px-2 bg-zinc-100">{recorrente.recurrence_day} {recorrente.recurrence_hour}</div>
                        <div className="px-2 bg-blue-100 w-full text-blue-500 border border-blue-400">BRL{recurrencePrice}.00</div>
                    </div>
                ))
            )}


            </div>
        </div>
    );
}






