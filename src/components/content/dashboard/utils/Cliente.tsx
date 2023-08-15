import { IconBrandWhatsapp, IconUser, IconVip, IconVipOff } from "@tabler/icons-react";
import Button from "@/components/button/Button";
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import customParseFormat from "dayjs/plugin/customParseFormat"
import 'dayjs/locale/pt-br';
import dayjs from "dayjs";


dayjs.extend(customParseFormat)
dayjs.extend(LocalizedFormat)
dayjs.locale('pt-BR')


interface ClienteProps {
    id: number;
    name: string;
    phone: number;
    recurrence: boolean;
    recurrence_day?: string;
    recurrence_hour?: string;
    recurrence_mode?: string;
  }

export default function Cliente(props: ClienteProps) {
    return (
            <div className={`p-1 flex flex-col gap-5 w-full justify-center items-center
            rounded-md font-sans cursor-pointer text-sm
            text border border-zinc-100 text-darkTheme transition-all`}>
                <div className="flex w-full items-center">
                
                    <div className="p-1"><IconUser/></div>
                    <div className="w-full">{props.name}</div>
                    <div className="flex gap-5 items-center w-full">

                        <div className="w-full max-lg:hidden">{props.phone}</div>
                        <div className="">{props.recurrence == true ? <IconVip/> : <IconVipOff/>}</div>
                        <div>
                            <Button variant="light" onClick={() => window.location.href = `https://wa.me/55${props.phone}`}>
                                <IconBrandWhatsapp/>
                            </Button>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        
    );
  }