import Button from "@/components/button/Button"
import { Box } from "@/components/content/dashboard/utils/Layout"
import Gifts from "@/data/Gifts"
import useProcess from "@/data/hooks/useProcess"
import { fetchGifts, insertGifts } from "@/data/server/Gifts"
import Image from "next/image"
import { useEffect, useState } from "react"





export default function GiftsShowCase() {
    const [data, setData] = useState<Gifts[]>([])
    const { processing, processInit, processEnd } = useProcess()

    const GiftGeneration = async() => {
        processInit()
        try {
            const InsertGifts = await insertGifts();
        }
        finally {
            processEnd()
        }
    }

    useEffect(() => {
        processInit()
        const fetchData = async() => {
            try {
                const consult = await fetchGifts();
                setData(consult)
            }
            finally {
                processEnd()
            }
        }
        fetchData();
    },[])


    return (
        <main className="w-full flex gap-3 max-md:flex-col">
            <Box>
                <Button variant="blue" onClick={() => GiftGeneration()} disabled>Gerar Presentes</Button>
            </Box>
            <Box>
                <div className={`w-full flex gap-3 rounded text-md font-medium border-b`}>
                <div className="w-24 text-center"> ID </div>
                        <div className="w-full"> Recompença </div>
                        <div className="w-full "> Ganhador </div>
                        <div className="w-36 "> Status </div>
                </div>
                {processing ? <Image alt="" src="/gif/Pulse-1s-244px.gif" width={50} height={0}/> : 
                data.map(item => (
                    <div key={item.id} className={`w-full flex gap-3 rounded text-sm font-medium
                    ${item.status ? "border-blue-300 bg-blue-100 text-blue-700" : "border-zinc-200 bg-zinc-100 text-zinc-700"}`}>
                        <div className="w-24 text-center py-2"> {item.id} </div>
                        <div className="w-full py-2"> {item.rewards} </div>
                        <div className="w-full py-2"> {item.client} </div>
                        <div className="w-36 py-2"> {item.status ? 'Resgatado' : 'Disponível'} </div>
                    </div>
                ))}
            </Box>
            
        </main>
    )
}