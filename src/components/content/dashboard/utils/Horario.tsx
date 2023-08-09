
import { useEffect, useState } from 'react';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import { IconToggleLeft, IconToggleRight } from '@tabler/icons-react';
import Button from '@/components/button/Button';

dayjs.extend(customParseFormat);
dayjs.extend(LocalizedFormat);
dayjs.locale('pt-BR');

interface HorarioDisponivelProps {
    id: number;
    day: string;
    hour: string;
    status: number;
    id_barbeiro: number;
    changeStatus: (id: number, level: boolean) => void
}



export default function HorarioDisponivel(props: HorarioDisponivelProps) {
    const dayPlusOne = dayjs(props.day).add(1, 'day');
    const [level, setLevel] = useState<boolean>(false);


    const changeStatus = async () => {
        setLevel(!level)
    }

    useEffect(() => {
        setLevel(props.status === 1 ? true : false);
    }, [props.status]);
    return (
        <div className={`flex gap-3 w-full  px-3 py-1 items-center rounded-full border font-medium
        ${level ? "border-blue-200 text-blue-900 bg-white" : "border-white text-zinc-400 bg-zinc-100 opacity-75"}`}>
            <div className='w-full text-sm'>{props.hour}</div>
            <div className='w-full text-sm'>{dayjs(dayPlusOne).format('DD / MM / YYYY')}</div>
            <div className='w-full text-sm max-md:hidden'>{props.status === 1 ? "DISPONÍVEL" : "INDISPONÍVEL"}</div>
            <div className='w-full text-sm max-md:hidden'>Código: {props.id}</div>
            <div>
                <Button variant='light' onClick={() => props.changeStatus(props.id, level)}>
                {level ? (
                    
                    <IconToggleRight className='text-blue-800'></IconToggleRight>
                    ) : (
                        <IconToggleLeft className='text-zinc-300'></IconToggleLeft>
                )}
                </Button>
            </div>
        </div>
    );
}
