import { useState, useEffect } from "react";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import Button from "@/components/button/Button";
import { Legend } from "@/components/content/dashboard/utils/Layout";
import { motion } from "framer-motion";
import animateJourney from "@/layout/animations/FadeUp";
import { serverUrl } from "@/data/server/Config";
import axios from "axios";
import Modal from "@/components/modal/ModalController";
import useProcess from "@/data/hooks/useProcess";

interface UserInsightsProps {
  id: any;
}

export default function UserInsights(props: UserInsightsProps) {
  const [completedAppointments, setCompletedAppointments] = useState<number>(0);
  const [saibaMais, setSaibaMais] = useState<boolean>(false)
  const [gift, setGift] = useState(false);
  const { processing, processInit, processEnd } = useProcess();
  const [generatedCode, setGeneratedCode] = useState("");

  useEffect(() => {
    const fetchCompletedAppointments = async () => {
      try {
        const response = await axios.get(`${serverUrl}/client-progress/${props.id}`);
        setCompletedAppointments(response.data.totalAppointments);
        console.log(response.data)
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    };
  
    fetchCompletedAppointments();
  }, [props.id]);
  
  const filledStars = Math.min(completedAppointments, 4);
  

  function generateRandomCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";
    let code = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  }

  async function handleGenerateCode() {
    processInit()
    try {
        const response = await axios.post(
            `${serverUrl}/delete-agendamentos-cliente/${props.id}`
        );
      const code = generateRandomCode();
      setGeneratedCode(code);
    } finally {
      processEnd();
    }
  }

  return (
    <motion.div
      className="w-full flex gap-5 rounded-sm max-md:w-full max-md:flex-col"
      variants={animateJourney}
      initial="start"
      animate="visible"
      exit="end"
    >
      <div
        className="flex flex-col w-full gap-5 items-center text-white bg-black border border-zinc-800 text-sm p-3 rounded-sm"
      >
        <Legend>Seu Progresso</Legend>
        <div className="flex w-full min-w-[250px]">
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
        {saibaMais ? (
        <div className=" bg-darkTheme p-3 rounded-md">
            Requisitos:
            <br /><br />
            <div className="font-sans w-full flex flex-col gap-5 text-xs">
                <div className="w-full">~ Realizar 5 agendamentos no site</div>
                <div className="w-full">~ Os agendamentos devem ser atendidos dentro do prazo</div>
                <div className="w-full">~ Para retirar o prêmio, deve ser mostrado o código na hora do pagamento</div>
            </div>
        </div>
        ): ""}
        <div className="w-full flex gap-3">
            <Button variant="light" onClick={() => setSaibaMais(!saibaMais)}>{saibaMais ? 'OK' : 'Saiba mais'}</Button>
            {filledStars > 4 ? (
                <Button variant="green" onClick={() => setGift(true)}>Abrir Gift</Button>
            ) : ''}
        </div>
        {gift && (
            <div className="mt-3 bg-darkTheme p-3 rounded-md">
            {processing ? "" : `Código do Gift: ${generatedCode}`}
            </div>
        )}
      </div>
    </motion.div>
  );
}
