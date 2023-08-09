import {
    IconArrowNarrowUp,
    IconBrandCashapp,
    IconBrandWhatsapp,
    IconCalendarEvent,
    IconDeviceMobile,
    IconDotsVertical,
    IconId,
    IconRazorElectric,
    IconTrash,
    IconUser,
} from '@tabler/icons-react';
import Button from '@/components/button/Button';
import ExpandDown from '@/utils/ExpandDown';
import { useCallback, useEffect, useState } from 'react';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import axios from 'axios';
import useProcess from '@/data/hooks/useProcess';
import { serverUrl } from '@/data/server/Config';

dayjs.extend(customParseFormat);
dayjs.extend(LocalizedFormat);
dayjs.locale('pt-BR');

interface HorarioAgendadoProps {
    id: number;
    cliente: number;
    product: string;
    day: string;
    hour: string;
    barber: any;
    value: number;
    id_cliente: number;
    deleteHorario: (hodarioId: number) => void;
}

export default function HorarioAgendado(props: HorarioAgendadoProps) {
    const [clientName, setClientName] = useState<string>('');
    const [barberName, setBarberName] = useState<string>('');
    const { processing, processInit, processEnd } = useProcess();

    const getClienteName = useCallback(async () => {
        try {
            processInit();
            await axios
                .get(
                    `${serverUrl}/cliente-name-only/${props.id_cliente}`
                )
                .then((response) => {
                    setClientName(response.data.name);
                });
        } catch (error) {
            console.log(error);
        } finally {
            processEnd();
        }
    }, [props.barber, props.id_cliente]);
    const getBarberName = useCallback(async () => {
        try {
            processInit();
            await axios
                .get(
                    `${serverUrl}/barber-name-only/${props.barber}`
                )
                .then((response) => {
                    setBarberName(response.data.nome);
                });
        } catch (error) {
            console.log(error);
        } finally {
            processEnd();
        }
    }, [props.id]);
    useEffect(() => {
        getBarberName();
        getClienteName();
    }, [getBarberName, getClienteName]);

    const dayPlusOne = dayjs(props.day).add(1, 'day');
    const [active, setActive] = useState<boolean>(false);
    return (
        <div
            className={`p-2 flex flex-col gap-5 w-full justify-center items-center
            rounded-md font-sans cursor-pointer text-sm 
            border   transition-all
            ${active ? "border-blue-400 text-blue-500 bg-blue-100" : "border-zinc-200 text-darkTheme bg-zinc-100"}`}
        >
            <div
                className="flex w-full items-center"
                onClick={() => setActive(!active)}
            >
                <div className="p-2">
                    <IconRazorElectric />
                </div>
                <div className="w-full">{dayPlusOne.format('DD.MM.YY')}</div>
                <div className="w-full">{props.hour}</div>
                <div className="w-full max-lg:hidden">{props.product}</div>
                <div>
                    <Button variant="light">
                        {active ? (
                            <IconArrowNarrowUp />
                        ) : (
                            <IconDotsVertical />
                        )}
                    </Button>
                </div>
            </div>
            <ExpandDown active={active}>
                <div className="w-full grid grid-cols-2 gap-2 max-lg:grid-cols-1">
                    <div className="w-full flex gap-2 p-2 bg-white rounded-md">
                        <div>
                            <IconId />
                        </div>
                        <div className="w-full">Código: {props.id}</div>
                    </div>
                    <div className="w-full flex gap-2 p-2 bg-white rounded-md">
                        <div>
                            <IconDeviceMobile />
                        </div>
                        <div className="w-full">{props.cliente}</div>
                    </div>

                    <div className="w-full flex gap-2 p-2 bg-white rounded-md">
                        <div>
                            <IconCalendarEvent />
                        </div>
                        <div className="w-full">
                            {dayPlusOne.format('DD [de] MMMM, YYYY')}
                        </div>
                    </div>
                    <div className="w-full flex gap-2 p-2 bg-white rounded-md">
                        <div>
                            <IconRazorElectric />
                        </div>
                        <div className="w-full">{!processing && barberName}</div>
                    </div>
                    <div className="w-full flex gap-2 p-2 bg-white rounded-md">
                        <div>
                            <IconBrandCashapp />
                        </div>
                        <div className="w-full">BRL{props.value}.00</div>
                    </div>
                    <div className="w-full flex gap-2 p-2 bg-white rounded-md">
                        <div>
                            <IconUser />
                        </div>
                        <div className="w-full">{!processing && clientName}</div>
                    </div>
                    <div className="w-full flex gap-2 p-2 bg-white rounded-md">
                        <Button
                            variant="red"
                            onClick={() => props.deleteHorario(props.id)}
                        >
                            <IconTrash />
                        </Button>
                        <Button variant="green">
                            <IconBrandWhatsapp />
                        </Button>
                    </div>
                </div>
            </ExpandDown>
        </div>
    );
}
