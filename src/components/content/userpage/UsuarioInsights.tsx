import { useState, useEffect } from "react";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import Button from "@/components/button/Button";
import { Legend } from "@/components/content/dashboard/utils/Layout";
import { motion } from "framer-motion";
import animateJourney from "@/layout/animations/FadeUp";
import { serverUrl } from "@/data/server/Config";
import axios from "axios";

interface UserInsightsProps {
  id: any;
}

export default function UserInsights(props: UserInsightsProps) {
  const [completedAppointments, setCompletedAppointments] = useState<number>(0);

  useEffect(() => {
    const fetchCompletedAppointments = async () => {
      try {
        const response = await axios.get(`${serverUrl}/client-progress/${props.id}`);
        setCompletedAppointments(response.data.totalAppointments);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    };
  
    fetchCompletedAppointments();
  }, [props.id]);
  
  const filledStars = Math.min(completedAppointments, 4);
  


  return (
    <motion.div
      className="flex gap-5 rounded-sm max-md:w-full max-md:flex-col"
      variants={animateJourney}
      initial="start"
      animate="visible"
      exit="end"
    >
      <div
        className="flex flex-col w-full gap-5 items-center text-white bg-black border border-zinc-800 text-sm p-3 rounded-sm"
      >
        <Legend>Seu Progresso</Legend>
        <div className="flex w-full">
          {Array.from({ length: 5 }).map((_, index) =>
            index < filledStars ? (
              <IconStarFilled
                key={index}
                width={30}
                height={30}
                className="text-yellow-400"
              />
            ) : (
              <IconStar key={index} width={30} height={30} />
            )
          )}
        </div>
        <div className="p-2 font-sans text-sm text-zinc-800">
          ! Ao completar 5 cortes você receberá um grátis
        </div>
        <div className="w-full flex gap-3">
            <Button variant="light">Saiba mais</Button>
            {filledStars > 4 ? (
                <Button variant="green">Abrir Gift</Button>
            ) : ''}
        </div>
      </div>
    </motion.div>
  );
}
