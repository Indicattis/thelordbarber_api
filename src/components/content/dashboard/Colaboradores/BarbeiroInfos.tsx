import axios from "axios";
import Button from "@/components/button/Button";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import animateJourney from "@/layout/animations/FadeUp";
import useProcess from "@/data/hooks/useProcess";
import { useCallback, useEffect, useState } from "react";
import { serverUrl } from "@/data/server/Config";

type Barbeiro = {
    id: number;
    nome: string;
    login: string;
    idade: number;
    cargo: string;
    senha: string;
};

interface BarbeiroInfosProps {
    barbeiro: number;
    deleteBarber: (id: number) => void;
}

export default function BarbeiroInfos(props: BarbeiroInfosProps) {
    const { register, handleSubmit } = useForm<Barbeiro>();
    const { processing, processInit, processEnd } = useProcess();
    const [data, setData] = useState<Barbeiro[]>([]);

    const onSubmit = async (data: Barbeiro) => {
        processInit()
        try {
            if (props.barbeiro) {
                const response = await axios.put(
                    `${serverUrl}/admin-set-all/${props.barbeiro}`,
                    data
                );
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            processEnd()
        }
    };
    // barber-id

    const getBarberDetails = useCallback (async() => {
        processInit()
        try{
            const response = await axios.get(`${serverUrl}/barber-id/${props.barbeiro}`)
            setData(response.data);
        }
        finally {

            processEnd()
        }
    },[props.barbeiro])

    useEffect( () => {
        getBarberDetails()
    },[])
    // async function gerarHorarios(id: number | undefined){
    //     try {
    //         processInit()
    //         axios.post(`${serverURL}insert-horarios-barbeiro`,  
    //         { 
    //             barber_id: id,
    //         })
    //         .then((response) => {
    //           console.log("Horários inseridos no banco");
    //         })
    //         .catch((error) => {
    //           console.error("Erro ao inserir horários:", error);
    //         });
    //     }
    //     finally {
    //         processEnd()
    //         props.refresh()
    //     }
    // }
      
    return (
        <motion.form onSubmit={handleSubmit(onSubmit)} className="max-md:w-full"
            variants={animateJourney}
            initial="start"
            animate="visible"
            exit="end">
            {processing ? "" : (
data.length > 0 ? (
    <div className="w-full flex flex-col gap-5 text-sm text-center font-poppins">
        <div className="w-full flex items-center">
            <div className="bg-zinc-200 w-[120px] p-5 font-semibold">Usuário:</div>
            <input
                className="bg-zinc-100 p-5 w-full"
                placeholder=""
                type="text"
                {...register("login")}
                defaultValue={data[0].login}
            />
        </div>
        <div className="w-full flex items-center">
        <div className="bg-zinc-200 w-[120px] p-5 font-semibold">Nome:</div>
            <input
                className="bg-zinc-100 p-5  w-full"
                placeholder=""
                type="text"
                {...register("nome")}
                defaultValue={data[0].nome}
            />
        </div>
        <div className="w-full flex items-center">
        <div className="bg-zinc-200 w-[120px] p-5 font-semibold">Idade:</div>
            <input
                className="bg-zinc-100 p-5  w-full"
                placeholder=""
                type="number"
                {...register("idade")}
                defaultValue={data[0].idade}
            />
        </div>
        
        <div className="w-full flex items-center">
            <div className="bg-zinc-200 w-[120px] p-5 font-semibold">Cargo:</div>
            <select
                className="bg-zinc-100 p-5  w-full"
                placeholder={data[0].cargo}
                {...register("cargo")}
                defaultValue={data[0].cargo}
            >
                <option value="Administrador">Administrador</option>
                <option value="Atendente">Atendente</option>
                <option value="Proprietário">Proprietário</option>
            </select>
            
        </div>
        
        <div className="w-full flex items-center">
        <div className="bg-zinc-200 w-[120px] p-5 font-semibold">Senha:</div>
        <input
            className="bg-zinc-100 p-5  w-full"
            placeholder=""
            type="password"
            {...register("senha")}
            defaultValue={data[0].senha}
        />
            
        </div>
        <div className="flex gap-5 w-full">
            <Button variant="green" type="submit">
                Atualizar
            </Button>
            {data[0].cargo == "Proprietário" ? "" : (
                <Button variant="red" type="button" onClick={() => props.deleteBarber(data[0].id)}>
                Excluir
            </Button>
            )}
            
        </div>
    </div>
): <div>Os dados do barbeiro estão indisponíveis.</div>
            )}
            
        </motion.form>
    );
}