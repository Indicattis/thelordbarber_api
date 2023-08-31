import { IconChartInfographic, IconChartLine } from "@tabler/icons-react";
import axios from "axios";
import Button from "@/components/button/Button";
import { Legend } from "@/components/content/dashboard/utils/Layout";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Line, LineChart } from "recharts";
import { useMediaQuery } from 'react-responsive';
import { serverUrl } from "@/data/server/Config";

export default function Previstos() {
    const [agendamentos, setAgendamentos] = useState<{ dia: number; total: number }[]>([]);
    const [graphType, setGraphType] = useState<boolean>(true);
    const [totalAgendamentos, setTotalAgendamentos] = useState(0);
    const currentMonth = dayjs().month() + 1
    const [month, setMonth] = useState<number>(currentMonth)

    useEffect(() => {
        const fetchAgendamentos = async () => {
            try {
                const response = await axios.get<{ dia: number; total: number }[]>(
                    `${serverUrl}/insights-mes/${month}`
                );
                setAgendamentos(response.data);
                setTotalAgendamentos(
                    response.data.reduce((total, agendamento) => total + agendamento.total, 0)
                );
            } catch (error) {
                console.error("Erro ao obter a quantidade de agendamentos:", error);
            }
        };

        fetchAgendamentos();
    }, [month]);

    if(month < currentMonth) {
        setMonth(currentMonth)
    }

    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <div className="w-full flex flex-col gap-3">
            <Legend>Insights</Legend>
            <div className="font-semibold p-1 w-full">
                FATURAMENTO: BRL{totalAgendamentos}.00
            </div>
            <div className="absolute top-0 right-0 p-5 max-md:hidden">
                <Button variant="default" onClick={() => setGraphType(!graphType)}>
                    {graphType ? (
                        <IconChartInfographic width={50} height={50} />
                    ) : (
                        <IconChartLine width={50} height={50} />
                    )}
                </Button>
            </div>
            <div className="w-full flex flex-col max-md:hidden">
                {graphType ? (
                    <ResponsiveContainer width="95%" height={isMobile ? 600 : 400}>
                        <BarChart data={agendamentos.map((agendamento) => ({ ...agendamento, key: agendamento.dia }))}>
                            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                            <XAxis dataKey="dia" />
                            {!isMobile && <YAxis />}
                            <Tooltip />
                            <Bar dataKey="total" fill="#3b3bf6" />
                        </BarChart>
                    </ResponsiveContainer>

                ) : (
                    <ResponsiveContainer width="95%" height={isMobile ? 600 : 400}>
                        <LineChart data={agendamentos} key="line-chart">
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Tooltip />
                            <XAxis dataKey="dia" />
                            {!isMobile && <YAxis />}
                            <Line type="monotone" dataKey="total" stroke="#3b3bf6" />
                        </LineChart>
                    </ResponsiveContainer>
                )}

            </div>
            <div className="hidden flex-col gap-1 w-full max-md:flex">
                {agendamentos.map((agendamento, index) => (
                    <div className="flex items-center gap-3 w-full" key={index}>
                        <div className="w-12 h-8 flex items-center justify-center rounded-full font-semibold">
                            {agendamento.dia}
                        </div>
                        <progress value={agendamento.total} max={1040} key={index}
                            className="custom-progress"></progress>
                        <div className="w-[130px] font-semibold rounded-full text-center">
                            BRL{agendamento.total}.00
                        </div>

                    </div>
                ))}
            </div>
            <div className="flex w-full">
            <Button variant="light" onClick={() => setMonth(month - 1)}>
                Mês anterior
            </Button>
            <Button variant="light" onClick={() => setMonth(month + 1)}>
                Próximo mês
            </Button>
            </div>
            
        </div>
    );
}
