'use client'

import numberURL from '@/data/SendWpp';
import { IconBrandInstagram, IconBrandWhatsapp, IconMapPinFilled, IconRazorElectric } from '@tabler/icons-react';
import Image from 'next/image';


export default function Contato() {
    
    function relocate(pathName: string) {
        window.location.href = pathName;
    }  
    return (
        <div className="contato flex flex-col items-center justify-center text-lg max-md:text-sm text-white w-full gap-5 rounded-md shadow">
            <Image alt='' src="/img/logoNew2.png" className='rounded-full' draggable='false' height={250} width={250}/>
            <div className="flex cursor-pointer p-5 font-poppins bg-darkTheme 
            rounded-full border border-zinc-700 justify-center items-center"
            onClick={() => window.location.href = 'https://goo.gl/maps/5EkdDmLu5uyVPfcn8'}>
                <div className="text-red-700">
                    <IconMapPinFilled />
                </div>
                <div className='px-5'>
                    Onde estamos!
                </div>
            </div>
            <div className="overflow-hidden rounded-full shadow-2xl">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3483.7685248298!2d-51.143008223534295!3d-29.171492691349062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951ebd5a122bc627%3A0x690f67ac0bcb8225!2sThe%20Lord%20Barber%20e%20tattoo!5e0!3m2!1spt-BR!2sbr!4v1685372975457!5m2!1spt-BR!2sbr"
                    width="350"
                    height="350"
                    loading="lazy"
                ></iframe>
            </div>
                <div className='flex p-5 w-full justify-center font-poppins gap-5 max-lg:flex-col'>
                    <ContatoItem 
                    icon={<IconBrandWhatsapp className='m-1 text-green-500'/>}
                    onClick={() => relocate(`${numberURL}/?text=Olá`)}>
                        <span className='m-2'>
                         WhatsApp
                        </span>
                    </ContatoItem>
                    <ContatoItem 
                    icon={<IconBrandInstagram className='m-1 text-red-500'/>}
                    onClick={() => relocate('https://www.instagram.com/thelord_barber.tattoo/')}
                    >
                        <span className='m-2'>
                            Instagram
                        </span>
                    </ContatoItem>
                    <ContatoItem 
                    icon={<IconRazorElectric className='mx-1 text-yellow-600'/> }
                    onClick={() => relocate('/agendamento')}>
                        <span className='m-2'>
                            Agendar Horário
                        </span>
                    </ContatoItem>
                </div>
        </div>
    );
}

interface ContatoProps {
    children:any
    icon: any
    onClick?: () => void
}
function ContatoItem (props: ContatoProps) {
    return(
        <div className='w-full bg-darkTheme flex items-center 
        rounded-full border border-zinc-800 shadow justify-center
        cursor-pointer '
        onClick={props.onClick}>
            {props.icon}
            {props.children}
        </div>
    )
}