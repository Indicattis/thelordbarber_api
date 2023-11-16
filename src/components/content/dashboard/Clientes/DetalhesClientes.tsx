import { IconVip, IconVipOff } from "@tabler/icons-react";
import axios from "axios";
import Button from "@/components/button/Button";
import { Legend } from "@/components/content/dashboard/utils/Layout";
import Clientes from "@/data/Clientes";
import dataDelete from "@/data/contexts/useDelete";
import useProcess from "@/data/hooks/useProcess";
import { serverUrl } from "@/data/server/Config";
import { motion } from "framer-motion";
import animateJourney from "@/layout/animations/FadeUp";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchCliente, updateCliente } from "@/data/server/Clientes";


interface DetalhesClientesProps {
    clienteId: number;
    feedbackToggle: (type: 'alert' | 'warning' | 'success', message: any) => void
}

export default function DetalhesClientes(props: DetalhesClientesProps) {
    const [data, setData] = useState<Clientes | null>(null);
    const { register, handleSubmit, reset } = useForm<Clientes>();
    const [recurring, setRecurring] = useState<boolean>()
    const { processing, processInit, processEnd } = useProcess()


    const fetchData = useCallback (async () => {
        try {
            processInit()
            const Cliente = await fetchCliente(props.clienteId);
            setData(Cliente);
            reset(Cliente[0]);
            setRecurring(Cliente[0].recurrence);
        } catch (error) {
            console.log(error);
        }
        finally {
            processEnd()
        }
    }, [props.clienteId, deleteElement, onSubmit]);

    useEffect(() => {
        fetchData();
    }, [props.clienteId]);

    async function onSubmit (data: Clientes) {
        try {
            if (props.clienteId) {
                const requestData = {
                    ...data,
                    recurrence: recurring ? 1 : 0, // Converte para 1 (true) ou 0 (false)
                };
                const update = await updateCliente(props.clienteId, requestData);
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            props.feedbackToggle('success', 'Cliente atualizado!')
        }
    };


    async function acionarRotinaAgendamentos ()  {
        try {
            processInit()
            await axios.post(`${serverUrl}/insert-recorrentes-cliente`, 
            {
                cliente: props.clienteId,
            })
            
        }
        catch (error) {
            console.log('Erro ao adicionar agendamentos recorrentes:', error);
            props.feedbackToggle('warning', 'Erro!')
        }
        finally {
            processEnd()
            props.feedbackToggle('success', 'Agendamentos recorrentes inseridos!')
        };
      }


    async function deleteElement(id: number) {
        try {
            processInit()
            await dataDelete("cliente", id)
        }
        finally {
            props.feedbackToggle('warning', 'Cliente deletado!')
            processEnd()
        }
    }   
    return (
        <motion.div
            key={props.clienteId}
            className="w-full bg-white text-zinc-800 rounded-md shadow p-5 flex flex-col gap-5 font-sans text-sm"
            variants={animateJourney}
            initial="start"
            animate="visible"
            exit="end"
        >
            <Legend>Detalhes</Legend>
            {processing ? (
                <Image alt="" src="/gif/Pulse-1s-244px.gif" width={50} height={0} />
            ) : (
        // Verificar se data está definido antes de renderizar o formulário
                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    key={props.clienteId}
                    className={`flex flex-col gap-5 font-sans w-full`}
                >
                    <div className="w-full flex flex-col gap-5">
                        <div className="w-full flex">
                            <div className="bg-zinc-200 w-[120px] p-5 font-semibold">ID:</div>
                            <div className="bg-zinc-100 p-5 w-full">
                                {props.clienteId}
                            </div>
                        </div>
                        
                        <div className="w-full flex">
                            <div className="bg-zinc-200 w-[120px] p-5 font-semibold">Nome:</div>
                                <input
                                className={`bg-zinc-100 w-full p-5`}
                                type={"text"}
                                placeholder=""
                                {...register("name")}
                                defaultValue={data?.name}
                            />
                        </div>
                        <div className="w-full flex">
                            <div className="bg-zinc-200 w-[120px] p-5 font-semibold">Telefone:</div>
                                <input
                                className={`bg-zinc-100 w-full p-5`}
                                type={"text"}
                                placeholder=""
                                {...register("phone")}
                                defaultValue={data?.phone}
                            />
                        </div>
                        <div className="w-full flex">
                            <div className="bg-zinc-200 w-[120px] p-5 font-semibold">Senha:</div>
                                <input
                                className={`bg-zinc-100 w-full p-5`}
                                type={"text"}
                                placeholder=""
                                {...register("senha")}
                                defaultValue={data?.senha}
                            />
                        </div>
                    </div>

                    {/* VIP toggle */}
                    <div className={`h-10 w-28 rounded-full flex overflow-hidden items-center relative cursor-pointer
                        transition-all border border-zinc-200
                        ${recurring ? "bg-zinc-200 border-green-400 text-green-400" : "text-black"}`}
                        onClick={() => setRecurring(!recurring)}>
                        <div className="w-full text-center z-10  font-semibold"><IconVipOff/></div>
                        <div className="w-full text-center z-10  font-semibold"><IconVip/></div>
                        <div className={`absolute h-full w-[50%] rounded-full bg-white  border 
                        ${recurring ? "right-0 border-green-400" : "left-0"} transition-all`}></div>
                    </div>


                    {
                    recurring ? (
                        <div className="w-full flex flex-col gap-5">
                            <div className="w-full flex">
                                <div className="bg-zinc-200 w-[120px] p-5 font-semibold">Dia:</div>
                                    <select
                                    className={`bg-zinc-100 p-5 w-full`}
                                    {...register("recurrence_day")}
                                    defaultValue={data?.recurrence_day}
                                    >
                                        <option value="seg">Segunda-feira</option>
                                        <option value="ter">Terça-feira</option>
                                        <option value="qua">Quarta-feira</option>
                                        <option value="qui">Quinta-feira</option>
                                        <option value="sex">Sexta-feira</option>
                                        <option value="sab">Sábado</option>
                                    </select>
                            </div>
                            <div className="w-full flex">
                                <div className="bg-zinc-200 w-[120px] p-5 font-semibold">Horário:</div>
                                    <select
                                    className="bg-zinc-100 p-5 w-full"
                                    {...register("recurrence_hour")}
                                    defaultValue={data?.recurrence_hour}
                                    >
                                        <option value="">Selecione o horário</option>
                                        <option value="08:00:00">08:00</option>
                                        <option value="08:40:00">08:40</option>
                                        <option value="09:20:00">09:20</option>
                                        <option value="10:00:00">10:00</option>
                                        <option value="10:40:00">10:40</option>
                                        <option value="11:20:00">11:20</option>
                                        <option value="13:20:00">13:20</option>
                                        <option value="14:00:00">14:00</option>
                                        <option value="14:40:00">14:40</option>
                                        <option value="15:20:00">15:20</option>
                                        <option value="16:00:00">16:00</option>
                                        <option value="16:40:00">16:40</option>
                                        <option value="17:20:00">17:20</option>
                                        <option value="18:00:00">18:00</option>
                                        <option value="18:40:00">18:40</option>
                                        <option value="19:20:00">19:20</option>
                                        <option value="20:00:00">20:00</option>
                                    </select>
                            </div>
                            <div className="w-full flex">
                                <div className="bg-zinc-200 w-[120px] p-5 font-semibold">Cortes:</div>
                                    <select
                                    className="bg-zinc-100 p-5 w-full"
                                    {...register("recurrence_mode")}
                                    defaultValue={data?.recurrence_mode}
                                    >
                                        <option value="semanal">Semanais (4x) - 1x por semana</option>
                                        {/* <option value="quinzenal">Quinzenais (2x) - 1x a cada duas semanas</option>
                                        <option value="mensal">Mensais (1x) - 1x por mês</option> */}
                                    </select>
                            </div>
                            <Button variant="blue" type="button" onClick={acionarRotinaAgendamentos} disabled={!recurring && true}>
                                {
                                processing ? <Image alt="" src="/gif/Pulse-1s-244px.gif" width={24} height={0} /> : "Gerar horários do mês seguinte"
                                }
                            </Button>
                        </div>
                    ) : ""
                    }
                    <div className="w-full flex gap-5">
                        
                        <Button variant="green" type="submit">Salvar</Button>
                        <Button variant="red" onClick={() => deleteElement(props.clienteId)}>Excluir</Button>
                    </div>
                    
                </form>
            )}
        </motion.div>
    );
}
