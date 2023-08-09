import { IconCheck, IconX } from "@tabler/icons-react";
import Button from "@/components/button/Button";
import { Box, Legend } from "@/components/content/dashboard/utils/Layout";
import dayjs, { Dayjs } from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from "dayjs/plugin/customParseFormat";
import 'dayjs/locale/pt-br';
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import useProcess from "@/data/hooks/useProcess";
import { serverUrl } from "@/data/server/Config";

dayjs.extend(customParseFormat);
dayjs.extend(LocalizedFormat);
dayjs.locale('pt-BR');






interface MaintenceProps {
    id_barbeiro: number
}


export default function Maintence(props: MaintenceProps) {
    const currentMonth = dayjs().month() + 1;
    const nextMonth = dayjs().add(1, 'month').month() + 1;
    const [currentQuantidade, setCurrentQuantidade] = useState<number | null>(null);
    const [nextQuantidade, setNextQuantidade] = useState<number | null>(null);
    const { processing, processInit, processEnd } = useProcess();
  
    const fetchData = useCallback(async (month: any, setQuantidade: any) => {
      processInit();
      try {
        const response = await axios.get(`${serverUrl}/horarios-status`, {
          params: { id: props.id_barbeiro, month },
        });
      
        setQuantidade(response.data.quantidadeLinhas);
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
      finally {
        processEnd();
      }
    }, [props.id_barbeiro]);
  
    useEffect(() => {
      fetchData(currentMonth, setCurrentQuantidade);
      fetchData(nextMonth, setNextQuantidade);
    }, [currentMonth, fetchData, nextMonth]);

    async function gerarHorarios(id: number | undefined, month: number){
        try {
            processInit()
            await axios.post(`${serverUrl}/insert-horarios-barbeiro-mes`,  
            { 
                barber_id: id,
                month: month,
            })
            .then((response) => {
              console.log("Horários inseridos no banco");
            })
            .catch((error) => {
              console.error("Erro ao inserir horários:", error);
            });
            
            await timer()
        }
        finally {
            processEnd()
        }
    }
    async function timer() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(1)
            }, 5000)
        })
    }
    return (
      <Box>
        <Legend>Manutenção de horários</Legend>
        {processing ? "" : (
            <div className="grid grid-cols-5 gap-5 w-full max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
            <div className={`rounded-md p-3 w-full font-semibold flex flex-col justify-center gap-1`}>
            <div className={`text-2xl`}>Horários</div>
            <div className={`text-sm text-zinc-600`}>Mês: {currentMonth}</div>
            <div className={`text-sm text-zinc-600`}>{currentQuantidade} horários criados</div>
            <div className={`${currentQuantidade &&currentQuantidade > 400 ? "text-blue-500" : "text-red-600"} flex`}>Status: {currentQuantidade && currentQuantidade > 400 ? <IconCheck /> : <IconX />}</div>
            <Button onClick={() => gerarHorarios(props.id_barbeiro, currentMonth)} variant={currentQuantidade && currentQuantidade > 400 ? 'blue' : 'red'} disabled={currentQuantidade &&currentQuantidade > 400 ? true : false}>Gerar</Button>
            </div>
            <div className={`rounded-md p-3  w-full font-semibold flex flex-col justify-center gap-1`}>
            <div className={`text-2xl`}>Horários</div>
            <div className={`text-sm text-zinc-600`}>Mês: {nextMonth}</div>
            <div className={`text-sm text-zinc-600`}>{nextQuantidade} horários criados</div>
            <div className={`${nextQuantidade && nextQuantidade > 400 ? "text-blue-500" : "text-red-600"} flex`}>Status: {nextQuantidade && nextQuantidade > 400 ? <IconCheck /> : <IconX />}</div>
            <Button onClick={() => gerarHorarios(props.id_barbeiro, nextMonth)} variant={nextQuantidade && nextQuantidade > 400 ? 'blue' : 'red'} disabled={nextQuantidade && nextQuantidade > 400 ? true : false}>Gerar</Button>
            </div>
            </div>
        )}
      </Box>
    )
  }