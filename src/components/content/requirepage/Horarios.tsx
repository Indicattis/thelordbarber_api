import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { motion } from "framer-motion";
import animateJourney from "@/layout/animations/FadeUp";
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br';
import { IconCalendar } from "@tabler/icons-react";
import Button from "@/components/button/Button";
import useProcess from "@/data/hooks/useProcess";
import Image from "next/image";
import { serverUrl } from "@/data/server/Config";

type Horario = {
  id: number;
  day: string;
  hour: string;
  status: string;
};

type Props = {
  day: any;
  barber: number | null;
  setHour: (sendHour: string) => void;
  toBack: () => void;
};

dayjs.extend(customParseFormat)
dayjs.extend(LocalizedFormat)
dayjs.locale('pt-BR')

export default function Horarios({ day, setHour, barber, toBack }: Props) {
  const formattedDay = dayjs(day).format("D [de] MMMM, YYYY");

  const { processing, processInit, processEnd } = useProcess();
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [data, setData] = useState<Horario[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      processInit();
      try {
        const response = await axios.get(`${serverUrl}/horarios`, {
          params: { 
            day: day,
            barber: barber 
          },
        });
        
        // Filtrar horários que não estão no passado em relação ao dia atual
        const filteredData = response.data.filter((horario: Horario) => {
            const horarioTime = dayjs(horario.hour, "HH:mm:ss");
            const currentTime = dayjs(); // Horário atual
          
            return horarioTime.isAfter(currentTime);
          });
          
        setData(filteredData);

      } catch (error) {
        console.log(error);
      } finally {
        processEnd();
      }
    };
  
    fetchData();
  }, [day, barber]);

  const formatHour = (hour: string): string => {
    const formattedHour = dayjs(hour, "HH:mm:ss").format("HH:mm");
    return formattedHour;
  };

  const handleHourClick = (hourId: number) => {
    setSelectedHour(hourId);
  };

  const handleSetHour = () => {
    if (selectedHour) {
      const selectedHorario = data.find((horario) => horario.id === selectedHour);
      if (selectedHorario) {
        setHour(selectedHorario.hour);
      }
    }
  };

  return (
    <motion.div
      className="w-full flex flex-col items-center font-poppins"
      variants={animateJourney}
      initial="start"
      animate="visible"
      exit="end"
    >
      <div className="flex text-yellow-700 items-center justify-center h-12 px-5 gap-3 border-b border-yellow-700">
        <IconCalendar />
        {formattedDay}
      </div>
      {processing ? 
      <div className="w-full flex">
          <Image alt="" src="/gif/Pulse-1s-244px.gif" width={50} height={0}/> 
      </div>
      : (
        <div className={`grid grid-cols-4 gap-1 pt-2 w-full h-full mt-5 ${data.length < 1 && "grid-cols-1"}`}>

        {data.length > 1 ? data.map((horario) => (
          <div
            onClick={() => handleHourClick(horario.id)}
            key={horario.id}
            className={`px-4 h-12 flex justify-center items-center 
                        border w-[80px] rounded-md text-white 
                        cursor-pointer text-sm bg-darkTheme transition-all
                        ${
                          selectedHour === horario.id
                            ? "border-yellow-700 text-yellow-600"
                            : "border-zinc-800"
                        }`}
          >
            {formatHour(horario.hour)}
          </div>
        )): (
            <div className="w-full flex flex-col h-full text-sm gap-5 text-zinc-800 justify-center items-center">
               <div>Horários Indisponíveis</div>
               <div className="w-full"><Button variant="red" onClick={() => toBack()}>Voltar</Button> </div>
               
            </div>
        )}
      </div>
      )
      }
      <div className="w-full mt-5">
      {selectedHour && (
        <Button
          onClick={handleSetHour}
          variant="primary"
        >
          Próximo
        </Button>
      )}
      </div>
      
    </motion.div>
  );
}
