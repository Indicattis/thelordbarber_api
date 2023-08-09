import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState, useCallback } from 'react';
import { generateDate, months } from '@/utils/Calendar';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/pt-br';
import { Box, Legend } from '@/components/content/dashboard/utils/Layout';
import useProcess from '@/data/hooks/useProcess';
import Image from 'next/image';
import Horario from '@/data/Horario';
import { serverUrl } from '@/data/server/Config';

dayjs.extend(customParseFormat);
dayjs.extend(LocalizedFormat);
dayjs.locale('pt-BR');

interface DCalendarioProps {
    id_barbeiro: number
    sendParams: (date: any) => void;
}

export default function CalendarioHorarios(props: DCalendarioProps) {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    const currentDate = dayjs();

    const [today, setToday] = useState(currentDate);
    const [selectDate, setSelectDate] = useState(currentDate);
    const [horarios, setHorarios] = useState<Horario[]>([]);
    const { processing, processInit, processEnd } = useProcess();

    const fetchAgendamentos = useCallback(async (month: any) => {
        try {
            processInit();
          const response = await axios.get(
            `${serverUrl}/horarios-barbeiro-mes/${month}/${props.id_barbeiro}`
          );
          setHorarios(response.data);
        } catch (error) {
          console.error('Erro ao buscar agendamentos:', error);
          setHorarios([]);
        } finally {
          processEnd();
        }
      }, []);
      
    useEffect(() => {
        fetchAgendamentos(currentDate.month() + 1);
      }, []);



    function getParams(day: any) {
        setSelectDate(day);
        props.sendParams(dayjs(day).format('YYYY-MM-DD'));
    }

    function getDayClasses(date: any) {
        const agendamentosForDate = horarios.filter((agendamento) => {
            const agendamentoDate = new Date(agendamento.day);
            return (
                agendamentoDate.toDateString() === date.toDate().toDateString()
            );
        });

        // Defina as classes CSS com base nos agendamentos
        return agendamentosForDate.length 
        
    }
    return (
        <Box>
            
            <div className="grid grid-cols-7 max-md:w-full ">
                {days.map((day, index) => {
                    return (
                        <h1
                            key={index}
                            className="p-5 flex justify-center items-center text-md"
                        >
                            {day}
                        </h1>
                    );
                })}
            </div>
            {processing ? <div className='w-full h-full flex'><Image alt="" src="/gif/Pulse-1s-244px.gif" width={50} height={50}/></div> : (
                <div className=" max-md:w-full grid grid-cols-7 gap-3 border-t pt-3">
                {generateDate(today.month(), today.year()).map(
                    ({ date, currentMonth, today, ignore, sunday }, index) => {
                        const isSunday = date.day() === 0; // Verifica se é domingo
                        return (
                            <div
                                key={index}
                                className={`
                                border text-lg
                                h-16 w-16 flex justify-center
                                items-center flex-col
                                rounded-md transition-all
                                max-lg:h-12
                                max-lg:w-12
                                max-md:h-10
                                max-md:w-10
                                max-md:text-sm
                                ${
                                    currentMonth
                                        ? ' cursor-pointer'
                                        : 'text-zinc-200 border-hidden pointer-events-none'
                                }
                                ${
                                    selectDate.toDate().toDateString() ==
                                    date.toDate().toDateString()
                                        ? 'border-blue-400 text-blue-500 bg-blue-100'
                                        : 'border-zinc-100 '
                                }
                                ${
                                    isSunday
                                        ? ' text-zinc-200 cursor-no-drop border-none pointer-events-none'
                                        : ''
                                }
                                ${
                                    ignore
                                        ? 'text-zinc-200 cursor-not-allowed border-none pointer-events-none'
                                        : ''
                                }
                                ${today ? 'text-black border' : ''}
                                ${getDayClasses(date.subtract(1, 'day'))}`}
                                onClick={() => getParams(date)}
                            >
                                {date.date()}

                                <ProgressBar value={getDayClasses(date.subtract(1, 'day'))}/>
                            </div>
                        );
                    }
                )}
            </div>
            )}
            <div className="text-lg flex items-center justify-evenly h-14">
                <div className="flex items-center justify-evenly w-full gap-10">
                    <IconChevronLeft
                        className="cursor-pointer rounded-full  transition-all"
                        onClick={() => {
                            setToday(today.month(today.month() - 1));
                        }}
                    />
                    <div
                        className=" text-zinc-800 text-center w-full"
                        onClick={() => {
                            setToday(currentDate);
                        }}
                    >
                        <p>
                            {months[today.month()]}, {today.year()}
                        </p>
                    </div>
                    <IconChevronRight
                        className="cursor-pointer rounded-full  transition-all"
                        onClick={() => {
                            setToday(today.month(today.month() + 1));
                        }}
                    />
                </div>
            </div>
        </Box>
    );
}


function ProgressBar({ value }: { value: number }) {
    const [color, setColor] = useState('blue-400');
  
    function getColor(num: number) {
      if (num >= 1 && num <= 6) {
        setColor("red-500");
      } else if (num > 6 && num <= 12) {
        setColor("yellow-500");
      } else if (num > 12 && num <= 17) {
        setColor("blue-400");
      }
    }
  
    useEffect(() => {
      getColor(value);
    }, [value]);
  
    return (
      <div className='w-[90%] rounded-full h-1 bg-zinc-100 relative overflow-hidden'>
        <div
          className={`absolute top-0 left-0 h-1 bg-${color}`}
          style={{ width: `${(value / 17) * 100}%` }}
        />
      </div>
    );
  }
  

