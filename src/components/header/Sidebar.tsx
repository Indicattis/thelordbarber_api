import { IconArrowBarRight, IconCalendarEvent, IconCircleKey, IconHome, IconPhoneCall, IconRazorElectric, IconUser } from '@tabler/icons-react';
import { useUser } from '@/data/server/Token';
import { motion } from 'framer-motion';
import animateSidebar from '@/layout/animations/Sidebar';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}
export default function Sidebar (props: SidebarProps ) {
    
    const { userLoged, userName, userImage } = useUser();
    
    if(props.isOpen) {
        return (
        <div className='fixed top-0 left-0 h-screen w-screen z-50 bg-[#000000e1]'
        onClick={props.onClose}>

            <motion.div className={`
            fixed top-0 bg-darkTheme transition-all w-[300px] z-50 overflow-hidden right-0 h-screen
            shadow-md shadow-zinc-700`}
            variants={animateSidebar}
            initial="start"
            animate="visible"
            exit="end">
                <legend className='p-2 flex items-center justify-center text-2xl text-white'>MENU</legend>
    
                <div className='mt-2 font-poppins text-xl flex flex-col gap-4 p-5'>
                <div className='w-full'>
                        {userLoged ? (
                                <div className=" flex gap-3 h-full items-center cursor-pointer hover:text-white transition-all"
                                onClick={() => window.location.href = '/usuario'}>
                                    {userLoged ? (
                                        <div className=" flex gap-3 h-full items-center cursor-pointer hover:text-white transition-all"
                                        onClick={() => window.location.href = '/usuario'}>
                                            <Image alt="" src={`/user/${userImage}.png`} width={30} height={30}></Image>
                                            <div className="text-sm font-sans">
                                                {userName}
                                            </div>
                                        </div>
                                    ) : ""}
                                </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <Sideitem icon={<IconHome />} path={"/"}> HOME </Sideitem>
                    <Sideitem icon={<IconCalendarEvent />} path={"/agendamento"}> AGENDA</Sideitem>
                    <Sideitem icon={<IconRazorElectric />} path={"/usuario"}>Conta</Sideitem>
                    <Sideitem icon={<IconCircleKey/>} path={"/dashboard"}>Dashboard</Sideitem>
                    <div className='absolute bottom-28 flex text-sm'>
                        <div className="flex gap-4 items-center">
                            <Image
                                src="/devline/devline-logo.png"
                                alt=""
                                width={30}
                                height={30}
                                className="rounded-full"
                            />

                            <div className="text-sm">@DevLineRS</div>
                            <a href="/usage">Termos de uso</a>
                        </div>
                    </div>
                </div>

            </motion.div>
        </div>
        )
    }
    else {
        return null;
    }
    
};


interface ItemProps {
    children: any
    icon: any
    path?: any
    onClick?: () => void
}

function Sideitem(props: ItemProps) {
    
function relocate(pathName: string) {
    window.location.pathname = pathName;
  }
    return (
        <div className='w-full px-3 py-1 shadow-md shadow-black
        rounded-sm border border-zinc-800 text-sm
        cursor-pointer font-senthir
        flex justify-center gap-3 items-center
        transition-all bg-darkTheme
        hover:text-[#ff9e00]
        hover:border-[#ff9e00]'
        onClick={() => relocate(props.path)}>
            <div className='w-12 text-zinc-800'>
                {props.icon}
            </div>
            <div className='w-full'>
                {props.children}
            </div>
            
        </div>
    )
}


