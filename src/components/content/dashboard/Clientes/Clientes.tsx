import DetalhesClientes from "@/components/content/dashboard/Clientes/DetalhesClientes";
import ListagemClientes from "@/components/content/dashboard/Clientes/ListagemClientes";
import { useEffect, useState } from "react";
import AgendamentosCliente from "@/components/content/dashboard/Clientes/AgendamentosCliente";
import useProcess from "@/data/hooks/useProcess";

interface DashboardClientesProps {
    feedbackToggle: (type: 'alert' | 'warning' | 'success', message: any) => void
}

export default function DashboardClientes(props: DashboardClientesProps) {
    const [cliente, setCliente] = useState<number>(0)
    const [phone, setPhone] = useState<number>(0)
    const { processing, processInit, processEnd } = useProcess();

    function changeCliente(receivedClienteId: number, receivedPhone: number) {
        setCliente(receivedClienteId)
        setPhone(receivedPhone)
    }
    
    
    return (
        <main className="w-full flex flex-col gap-5">
            <div className="flex w-full max-md:flex-col gap-5">
                <div className="w-full flex flex-col gap-5">
                    <ListagemClientes sendClienteId={changeCliente}></ListagemClientes>
                    
                    
                </div>
                <div className="w-full">
                    {
                    cliente > 0 && (
                        <DetalhesClientes feedbackToggle={(type, message) => props.feedbackToggle(type,message)} clienteId={cliente}></DetalhesClientes>
                    )}
                </div>
            </div>
            {
                    cliente > 0 && (
                    <AgendamentosCliente clientePhone={phone} feedbackToggle={(type, message) => props.feedbackToggle(type,message)}></AgendamentosCliente>
                    )
                    }
        </main>
    )
}