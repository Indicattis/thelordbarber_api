import { IconBrandCashapp, IconCalendarEvent, IconCheck, IconClockHour9, IconRazor, IconRazorElectric, IconUser } from "@tabler/icons-react";
import dayjs from "dayjs";
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import customParseFormat from "dayjs/plugin/customParseFormat"
import 'dayjs/locale/pt-br';
import { IconDeviceMobile } from "@tabler/icons-react";
import { motion } from "framer-motion";
import animateAscent from "@/layout/animations/AscentColor";
import { BarberName } from "@/data/server/convert";

interface DisplayProps {
    day: any;
    hour: any;
    products: string;
    value?: number;
    user?: number;
    barber: number;
}

dayjs.extend(customParseFormat)
dayjs.extend(LocalizedFormat)
dayjs.locale('pt-BR')

export default function Display(props: DisplayProps) {
    const newDay = dayjs(props.day).format("DD [de] MMMM, YYYY")
    const formattedHour = dayjs(props.hour, "HH:mm:ss").format("HH:mm")


    
    return (
        <div className="font-poppins text-zinc-800 h-full 
         rounded-md flex flex-col text-sm w-full
        justify-between items-center">
            <div className="font-poppins text-zinc-800 w-full
                            rounded-md grid grid-cols-2 gap-3
                            justify-around items-center">
                {/* <div className="rounded-full bg-black p-5 border border-zinc-800 max-md:hidden">
                    <IconRazorElectric className="" width={50} height={50}/>
                </div> */}
                
                <DisplayItem icon={<IconDeviceMobile/>}>
                    <b className="font-poppins w-full">
                        {props.user == 0 ? "-" : (
                            props.user
                        )}
                    </b>
                </DisplayItem>
                <DisplayItem icon={<IconUser/>}>
                    {props.barber == 0 ? "-" : (
                        <BarberName id={props.barber}></BarberName>
                    )}
                    
                </DisplayItem>
                <DisplayItem icon={<IconRazor/>}>
                    {props.products == "" ? "-" : (
                        props.products
                    )}
                </DisplayItem>
                <DisplayItem icon={<IconBrandCashapp/>}>
                    <b className="font-poppins ">
                        {props.value == 0 ? "-" : (
                            props.value + ",00"
                        )}
                    </b>
                </DisplayItem>
                <DisplayItem icon={<IconCalendarEvent/>}>
                    <b className="font-poppins ">
                        {newDay == "Invalid Date" ? "-" : (
                            newDay
                        )}
                    </b>
                </DisplayItem>
                <DisplayItem icon={<IconClockHour9/>}>
                    <b className="font-poppins ">
                        {formattedHour == "Invalid Date" ? "-" : (
                            formattedHour
                        )}
                    </b>
                </DisplayItem>


                {/* <div className="w-full text-lg flex justify-center">
                    <Button variant="green"><b> Agendar!</b><IconCheck width={30} height={30}/></Button>
                </div> */}
            </div>
            
        </div>
    )
}

interface AgendarItemProps {
    children: any
    icon: any
}

function DisplayItem (props: AgendarItemProps){
    return (
        <motion.div className="bg-darkTheme p-2 w-full
        text-center border border-zinc-800 font-senthir
        rounded-sm flex gap-3 justify-center"
        variants={animateAscent}
        initial="start"
        animate="visible"
        exit="end">
            <div>{props.icon}</div>
            <div className="text-whiteColor w-full">{props.children}</div>
        </motion.div>
    )
}