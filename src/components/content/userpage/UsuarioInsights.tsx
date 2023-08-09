

import { IconStar, IconStarFilled } from "@tabler/icons-react"
import Button from "@/components/button/Button"
import { Legend } from "@/components/content/dashboard/utils/Layout"
import { motion } from "framer-motion"
import animateJourney from "@/layout/animations/FadeUp"


export default function UserInsights() {
    return (
        <motion.div
            className="flex gap-5 rounded-sm max-md:w-[90%] max-md:flex-col"
            variants={animateJourney}
            initial="start"
            animate="visible"
            exit="end"
        >
            <div className="flex flex-col w-full gap-5 items-center text-white bg-darkTheme mt-20  border border-zinc-800 text-sm
            p-3 rounded-sm"
            >
                <Legend>Progresso</Legend>
                <div className="flex w-full">
                    <IconStarFilled width={30} height={30} className="text-yellow-300"></IconStarFilled>
                    <IconStar width={30} height={30}></IconStar>
                    <IconStar width={30} height={30}></IconStar>
                    <IconStar width={30} height={30}></IconStar>
                </div>
                <div className="p-2 font-sans text-sm text-zinc-800">
                    ! Ao completar 4 cortes você receberá umm grátis
                </div>
                <Button variant="primary">COLETAR Recompensa</Button>
            </div>
        </motion.div>
    )
}