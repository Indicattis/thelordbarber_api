import axios from "axios";
import Button from "@/components/button/Button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import animateJourney from "@/layout/animations/FadeUp";
import Image from "next/image";
import useProcess from "@/data/hooks/useProcess";
import { serverUrl } from "@/data/server/Config";


type Barbeiro = {
    id: number
    nome: string
    idade: number
    cargo: string
    imagem: string
};
type Props = {
    setBarber: (sendBarber: number) => void;
}

export default function Barbeiro({ setBarber }: Props) {

    const [data, setData] = useState<Barbeiro[]>([]);
    const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
    const { processing, processInit, processEnd } = useProcess();


    useEffect(() => {
        const fetchData = async () => {
            try {
                processInit()
                const response = await axios.get(`${serverUrl}/barbeiros`);
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
            finally {
                processEnd()
            }
        };

        fetchData();
    }, []);

    const handleBarberClick = (barberId: number) => {
        setSelectedBarber(barberId);
    };

    const handleSetBarber = () => {
        if (selectedBarber) {
            const selectedBarbeiro = data.find((barbeiro) => barbeiro.id === selectedBarber);
            if (selectedBarbeiro) {
                setBarber(selectedBarbeiro.id);
            }
        }
    };

    return (
        <motion.div className="flex flex-col w-full gap-5"
        variants={animateJourney}
        initial="start"
        animate="visible"
        exit="end">
            {processing ? <div className='w-full flex'><Image alt="" src="/gif/Pulse-1s-244px.gif" width={50} height={50}/></div> : 
            data.map((barbeiro) => (
                <div
                    onClick={() => handleBarberClick(barbeiro.id)}
                    key={barbeiro.id}
                    className={`p-2 gap-5 flex justify-center items-center 
                        border w-full rounded-md text-white
                        cursor-pointer text-sm bg-darkTheme transition-all
                        ${
                            selectedBarber === barbeiro.id
                              ? "border-yellow-700 text-yellow-600"
                              : "border-zinc-800"
                          }`}
                >
                    <div className="w-28 rounded-full overflow-hidden">
                        <Image className="h-full w-full object-cover" src={barbeiro.imagem != '' ? `/uploads/${barbeiro.imagem}` : `/uploads/user_default.png`} alt="" width={1000} height={1000}/>
                    </div>
                    <div className="w-full">
                        <div className="text-zinc-800 font-poppins">
                            {barbeiro.cargo}
                        </div>
                        <div className="font-senthir">
                            {barbeiro.nome}
                        </div>
                        <div className="text-zinc-800">
                            {barbeiro.idade} Anos
                        </div>
                    </div>
                </div>
            ))}
            <div className="w-full mt-5">
                {selectedBarber && (
                    <Button
                        onClick={handleSetBarber}
                        variant="primary"
                    >
                        Próximo
                    </Button>
                )}
            </div>
        </motion.div>
    )
}