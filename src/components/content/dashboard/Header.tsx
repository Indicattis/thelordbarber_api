import { IconBuildingSkyscraper, IconCalendarEvent, IconChartBar, IconGift, IconLayoutDashboard, IconLogout, IconUser, IconUsersGroup } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

interface DashboardHeaderProps {
    setStage: (stage: number) => void
    cargo: string
    name: string
    login: string
    imagem: string
}

export default function DashboardHeader(props: DashboardHeaderProps) {

    const [stage, setStage] = useState(1)

    function changeStage(value: number) {
        setStage(value)
        props.setStage(value)
    }

    if (props.cargo == "Proprietário" && "Administrador") {
        return (
            <header className="w-[15%] h-[2000px] bg-white font-sans font-medium uppercase text-sm
            ">
                <nav className="w-full flex flex-wrap content-start h-full relative items-stretch">
                    <div className="h-[80px] flex flex-col justify-center w-[200px] cursor-pointer
                    max-md:hidden"
                    onClick={() => window.location.href = '/'}>
                        <Image src="/img/logoNewBlack.png" alt="" height={0} width={100} />
                    </div>
                    
                    <DashboardHeaderItem
                        setBg={stage == 1 ? "zinc-100" : "white"}
                        icon={<IconLayoutDashboard />}
                        item="Dashboard"
                        onItemClick={() => changeStage(1)}
                    />
                    <DashboardHeaderItem
                        setBg={stage == 2 ? "zinc-100" : "white"}
                        icon={<IconCalendarEvent />}
                        item="Agendas"
                        onItemClick={() => changeStage(2)}
                    />
                    <DashboardHeaderItem
                        setBg={stage == 3 ? "zinc-100" : "white"}
                        icon={<IconBuildingSkyscraper />}
                        item="Funcionários"
                        onItemClick={() => changeStage(3)}
                    />
                    <DashboardHeaderItem
                        setBg={stage == 4 ? "zinc-100" : "white"}
                        icon={<IconUsersGroup />}
                        item="Usuários"
                        onItemClick={() => changeStage(4)}
                    />
                    <DashboardHeaderItem 
                        item={"Insights"} 
                        icon={<IconChartBar />} 
                        onItemClick={() => changeStage(5)} 
                        setBg={stage == 5 ? "zinc-100" : "white"}
                    />
                    <DashboardHeaderItem 
                        item={"Gifts"} 
                        icon={<IconGift />} 
                        onItemClick={() => changeStage(7)} 
                        setBg={stage == 7 ? "zinc-100" : "white"}
                    />
                </nav>
            </header>
        );
    }
    else if (props.cargo == "Administrador") {
        return (
            <header className="w-[15%] h-[2000px] bg-white font-sans font-medium uppercase text-sm
            ">
                <nav className="w-full flex flex-wrap content-start h-full relative items-stretch">
                    <div className="h-[80px] flex flex-col justify-center w-[200px] cursor-pointer
                    max-md:hidden"
                    onClick={() => window.location.href = '/'}>
                        <Image src="/img/logoNewBlack.png" alt="" height={0} width={100} />
                    </div>
                    
                    <DashboardHeaderItem
                        setBg={stage == 1 ? "zinc-100" : "white"}
                        icon={<IconLayoutDashboard />}
                        item="Dashboard"
                        onItemClick={() => changeStage(1)}
                    />
                    <DashboardHeaderItem
                        setBg={stage == 2 ? "zinc-100" : "white"}
                        icon={<IconCalendarEvent />}
                        item="Agendas"
                        onItemClick={() => changeStage(2)}
                    />
                    <DashboardHeaderItem
                        setBg={stage == 3 ? "zinc-100" : "white"}
                        icon={<IconBuildingSkyscraper />}
                        item="Funcionários"
                        onItemClick={() => changeStage(3)}
                    />
                    <DashboardHeaderItem
                        setBg={stage == 4 ? "zinc-100" : "white"}
                        icon={<IconUsersGroup />}
                        item="Usuários"
                        onItemClick={() => changeStage(4)}
                    />
                </nav>
            </header>
        );
    }
    else if (props.cargo == "Atendente") {
        return (
            <header className="w-[15%] h-[2000px] bg-white font-sans font-medium uppercase text-sm
            ">
                <nav className="w-full flex flex-wrap content-start h-full relative items-stretch">
                    <div className="h-[200px] flex flex-col justify-center w-[200px] max-md:hidden">
                        <Image src="/img/logoNewBlack.png" alt="" height={135} width={135} />
                    </div>
                    
                    <DashboardHeaderItem
                        setBg={stage == 1 ? "zinc-100" : "white"}
                        icon={<IconLayoutDashboard />}
                        item="Dashboard"
                        onItemClick={() => changeStage(1)}
                    />
                    
                    <DashboardHeaderItem
                        setBg={stage == 2 ? "zinc-100" : "white"}
                        icon={<IconCalendarEvent />}
                        item="Agendas"
                        onItemClick={() => changeStage(2)}
                    />
                </nav>
            </header>
        );
    }else {
        return null; // ou <></> se preferir
      }
    
}

interface ItemProps {
    item: any;
    icon?: any
    selectedItem?: string;
    onItemClick: () => void;
    setBg: string
}

function DashboardHeaderItem(props: ItemProps) {



    return (
        <div
            className={`transition-all text-[12px] w-full justify-center h-[100px] px-4 flex items-center cursor-pointer gap-5
            bg-${props.setBg}`}
            onClick={props.onItemClick}
        >
            {props.icon}
            <div className="w-full max-lg:hidden">
            {props.item}

            </div>
        </div>
    );
}
