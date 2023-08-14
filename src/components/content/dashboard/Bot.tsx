import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "@/data/server/Config";
import { Box, Legend } from "@/components/content/dashboard/utils/Layout";
import Button from "@/components/button/Button";
import { IconRobot, IconRotate } from "@tabler/icons-react";
import useProcess from "@/data/hooks/useProcess";
import Image from "next/image";

export default function QRCodeDisplay() {
    const [qrCodeData, setQRCodeData] = useState<{ type: string; data: string } | null>(null);
    const [botStatus, setBotStatus] = useState('')
    const { processing, processInit, processEnd } = useProcess()

    const generateQRCode = async () => {
        processInit()
        try {
            const response = await axios.get(`${serverUrl}/init-bot`);
            setQRCodeData(response.data.response);
            setBotStatus(response.data.status)
          } catch (error) {
            console.error('Erro ao gerar QRCode:', error);
          }
        finally{
            processEnd()
        }
      };

    return (
        <Box>
            <div className="flex w-full gap-5 max-md:flex-col">
                <div className="flex w-[250px] border-2 rounded-full">
                    {qrCodeData?.data != undefined || qrCodeData?.type !=undefined ? (
                            <img src={`data:${qrCodeData?.type};base64,${qrCodeData?.data}`} alt="QR Code" className="border border-blue-500"/>
                    ) : (
                            <IconRobot width={90} height={190}/>
                    )}
                </div>
                <div className="w-full flex flex-col gap-5">
                    <Legend>Chatbot Whatsapp</Legend>
                    <div className="w-full flex gap-5">
                        <div className="w-10 p-1 font-medium">
                        Nome: 
                        </div>
                        <div className="w-full bg-zinc-100 p-1 text-zinc-600 rounded-md">
                        {botStatus != '' ? (botStatus == 'disconnected' ? '-' : 'WhatsappBot') : 'Aguardando Verificação...'}
                        </div>
                    </div>
                    <div className="w-full flex gap-5">
                        <div className="w-10 p-1 font-medium">
                            Status: 
                        </div>
                        <div className={`w-full bg-zinc-100 p-1 rounded-md
                        ${botStatus != '' ? (botStatus == 'disconnected' ? 'text-red-500' : 'text-green-500') : 'text-zinc-600'}`}>
                        {botStatus != '' ? (botStatus == 'disconnected' ? 'Desconectado' : 'Conectado') : 'Aguardando Verificação...'}
                        </div>
                    </div>
                    
                    <Button variant={botStatus != '' ? (botStatus == 'disconnected' ? 'red' : 'green') : 'blue'} onClick={generateQRCode}>
                        {processing ? <Image alt="" src="/gif/Pulse-1s-244px.gif" width={24} height={0}/> : (
                        botStatus != '' ? (
                            botStatus == 'disconnected' ? (
                                <div className="flex gap-3">
                                    Disconnected
                                    <IconRotate/>
                                </div>
                            ) : (
                                <div className="flex gap-3">
                                    Connected
                                    <IconRotate/>
                                </div>
                            )
                        ) : 'Verificar Status')}
                    </Button>
                </div>
            </div>
        </Box>
    );
}
