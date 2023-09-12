import { Legend } from "@/components/content/dashboard/utils/Layout";
import { motion } from "framer-motion";
import animateJourney from "@/layout/animations/FadeUp";
import { useEffect, useState } from "react";
import { fetchAgendamentosInsights } from "@/data/server/Agendamentos";

interface InsightsProps {
  barberId: any;
}

export default function Insights(props: InsightsProps) {
  const [agendamentos, setAgendamentos] = useState<number | null>(null);
  const [totalAgendamentos, setTotalAgendamentos] = useState<number | null>(null);
  const [selectedDays, setSelectedDays] = useState('7');

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const AgendamentosInsights = await fetchAgendamentosInsights(props.barberId, selectedDays)
        setAgendamentos(AgendamentosInsights.quantidade);
        setTotalAgendamentos(AgendamentosInsights.total);
      } catch (error) {
        console.error('Erro ao obter a quantidade de agendamentos:', error);
      }
    };

    fetchAgendamentos();
  }, [props.barberId, selectedDays]);

  return (
    <motion.div
      className="flex flex-col h-full gap-5 px-1 w-full"
      variants={animateJourney}
      initial="start"
      animate="visible"
      exit="end"
    >
      <Legend>Insights</Legend>

      <select
        name=""
        id=""
        className="w-full border border-zinc-200 px-5 py-2"
        value={selectedDays}
        onChange={(e) => setSelectedDays(e.target.value)}
      >
        <option value="7">7 dias</option>
        <option value="15">15 dias</option>
        <option value="30">30 dias</option>
      </select>

      <div className="flex w-full border border-zinc-100">
        <div className="py-2 px-5 bg-zinc-100 font-semibold">
            {agendamentos}
        </div>
        <div className="w-full flex justify-center items-center">
            Horários para os próximos: {selectedDays} dias
        </div>
      </div>
      <div className="flex w-full border border-zinc-100">
        <div className="py-2 px-5 bg-zinc-100 font-semibold">
            BRL{totalAgendamentos}.00
        </div>
        <div className="w-full flex justify-center items-center">
            Previsto para os próximos: {selectedDays} dias
        </div>
      </div>
    </motion.div>
  );
}
