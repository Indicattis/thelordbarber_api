'use client'

import DashboardAgendas from '@/components/content/dashboard/Agendas/Agendas';
import Colaboradores from '@/components/content/dashboard/Colaboradores/Colaboradores';
import DashboardHeader from '@/components/content/dashboard/Header';
import Login from '@/components/content/dashboard/Login';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import DashboardClientes from '@/components/content/dashboard/Clientes/Clientes';
import DashboardHome from '@/components/content/dashboard/Home/Home';
import { IconAlarm, IconLogout } from '@tabler/icons-react';
import DashboardInsights from '@/components/content/dashboard/Insights/DashboardInsights';
import Image from 'next/image';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/pt-br';
import { FeedBackProps } from '@/components/feedback/template';
import FeedbackWrapper from '@/components/feedback/FeedBackWrapper';
import MyAcount from '@/components/content/dashboard/Conta/MyAcount';

dayjs.extend(customParseFormat);
dayjs.extend(LocalizedFormat);
dayjs.locale('pt-BR');
export default function App() {
    const [dep, setDep] = useState<number>(1);
    const [token, setToken] = useState<string | undefined>(undefined);
    const [cargo, setCargo] = useState<string>('');
    const [user, setUser] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [imagem, setImagem] = useState<string>('');
    const [id, setId] = useState<number>(0);
    const [time, setTime] = useState(dayjs());

    const [feedbackType, setFeedbackType] = useState<"warning" | "alert" | "success">('alert')
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState<boolean>(false);

    const feedbackController = (type: "warning" | "alert" | "success", message: string) => {
        setFeedbackType(type)
        setFeedbackMessage(message);
        setShowFeedback(true);
    }

    function changeToken(
        receivedToken: string,
        receivedUser: string,
        receivedId: number,
        receivedName: string,
        receivedImage: string
    ) {
        setToken(receivedToken);
        setUser(receivedUser);
        setId(receivedId);
        setName(receivedName);
        setImagem(receivedImage);
    }

    function changeDep(receivedDep: number) {
        setDep(receivedDep);
    }

    useEffect(() => {
        if (token !== undefined) {
            const decodedToken: any = jwtDecode(token);
            const { cargo } = decodedToken;
            setCargo(cargo);
        }
    }, [token]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(dayjs());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <main className="w-full">
            {token === undefined ? (
                <main className='h-screen flex items-center'>
                    <Login sendToken={changeToken}></Login>
                </main>
            ) : (
                <main className='flex w-full gap-2 bg-zinc-100'>
                    <DashboardHeader
                        name={name}
                        cargo={cargo}
                        login={user}
                        imagem={imagem}
                        setStage={changeDep}
                    />
                    <div className='w-full flex flex-col gap-5'>
                        <div className="w-full flex px-3 py-1 text-sm bg-white shadow-sm rounded-md items-center justify-between relative">
                            <div
                                className="rounded-full overflow-hidden cursor-pointer w-10 h-10"
                                onClick={() => setDep(6)}
                            >
                                <Image
                                    className="w-full h-full"
                                    src={`/uploads/${
                                        imagem ? imagem : 'user_default.png'
                                    }`}
                                    alt=""
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                            <div className="w-full p-5 max-md:hidden">
                                Seja bem vindo! <b>{name}</b>
                            </div>
                            <div className="absolute flex items-center gap-10 right-5 max-md:relative">
                                <div className="w-[120px] flex items-center gap-1 px-2 border border-blue-400 text-lg font-semibold text-blue-500 bg-blue-100 rounded-full">
                                    <div>
                                        <IconAlarm />
                                    </div>
                                    <div className="w-full">
                                        {time.format('HH:mm:ss')}
                                    </div>
                                </div>
                                <div className=" cursor-pointer"
                                onClick={() => window.location.href = '/dashboard'}>
                                    <IconLogout />
                                </div>
                            </div>
                        </div>
                        {dep === 1 && <DashboardHome feedbackToggle={(type, message) => feedbackController(type, message)} cargo={cargo} />}
                        {dep === 2 && <DashboardAgendas feedbackToggle={(type, message) => feedbackController(type, message)} />}
                        {dep === 3 && <Colaboradores feedbackToggle={(type, message) => feedbackController(type, message)}/>}
                        {dep === 4 && <DashboardClientes  feedbackToggle={(type, message) => feedbackController(type, message)}/>}
                        {dep === 5 && <DashboardInsights />}
                        {dep === 6 && <MyAcount feedbackToggle={(type, message) => feedbackController(type, message)} name={name} cargo={cargo} login={user} barber_id={id} imagem={imagem}/>}
                    </div>
                    
                {showFeedback && (
                    <FeedbackWrapper
                    result={true}
                    feedbackProps={{
                        message: feedbackMessage,
                        type: feedbackType,
                        onClick: () => setShowFeedback(false)
                    }}
                    />
                )}
                </main>
            )}
        </main>
    );
}




function showFeedback(
    type: 'warning' | 'alert' | 'success',
    message: string
) {
    const feedbackProps: FeedBackProps = {
        message,
        type,
        onClick: () => {
            // Função opcional para lidar com o clique no botão de fechar (se necessário)
            // Aqui, você pode definir a lógica para fechar o feedback se necessário
        },
    };

    return <FeedbackWrapper result={true} feedbackProps={feedbackProps} />;
}
