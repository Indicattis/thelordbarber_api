import Button from "@/components/button/Button";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import animateJourney from "@/layout/animations/FadeUp";
import useProcess from "@/data/hooks/useProcess";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { fetchBarbeiro, updateBarbeiro } from "@/data/server/Barbeiros";

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
        processInit();
        try {
            if (props.barbeiro) {
                const update = await updateBarbeiro(props.barbeiro, data)
            }
        } catch (error) {
            console.log(error);
        } finally {
            processEnd();
        }
    };

    const getBarberDetails = useCallback(async () => {
        processInit();
        try {
            const Barbeiro = await fetchBarbeiro(props.barbeiro);
            setData(Barbeiro);
        } finally {
            processEnd();
        }
    }, [props.barbeiro]);

    useEffect(() => {
        getBarberDetails();
    }, []);

    return (
        <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="max-md:w-full"
            variants={animateJourney}
            initial="start"
            animate="visible"
            exit="end"
        >
            {processing ? (
                <Image
                    alt=""
                    src="/gif/Pulse-1s-244px.gif"
                    width={50}
                    height={50}
                />
            ) : data.length > 0 ? (
                <div className="w-full flex flex-col gap-5 text-sm text-center font-poppins">
                    <div className="w-full flex items-center">
                        <div className="bg-zinc-200 w-[120px] p-5 font-semibold">
                            Usuário:
                        </div>
                        <input
                            className="bg-zinc-100 p-5 w-full"
                            placeholder=""
                            type="text"
                            {...register("login")}
                            defaultValue={data[0].login}
                        />
                    </div>
                    <div className="w-full flex items-center">
                        <div className="bg-zinc-200 w-[120px] p-5 font-semibold">
                            Nome:
                        </div>
                        <input
                            className="bg-zinc-100 p-5  w-full"
                            placeholder=""
                            type="text"
                            {...register("nome")}
                            defaultValue={data[0].nome}
                        />
                    </div>
                    <div className="w-full flex items-center">
                        <div className="bg-zinc-200 w-[120px] p-5 font-semibold">
                            Idade:
                        </div>
                        <input
                            className="bg-zinc-100 p-5  w-full"
                            placeholder=""
                            type="number"
                            {...register("idade")}
                            defaultValue={data[0].idade}
                        />
                    </div>

                    <div className="w-full flex items-center">
                        <div className="bg-zinc-200 w-[120px] p-5 font-semibold">
                            Cargo:
                        </div>
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
                        <div className="bg-zinc-200 w-[120px] p-5 font-semibold">
                            Senha:
                        </div>
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
                        {data[0].cargo == "Proprietário" ? (
                            ""
                        ) : (
                            <Button
                                variant="red"
                                type="button"
                                onClick={() => props.deleteBarber(data[0].id)}
                            >
                                Excluir
                            </Button>
                        )}
                    </div>
                </div>
            ) : (
                <div>Os dados do barbeiro estão indisponíveis.</div>
            )}
        </motion.form>
    );
}
