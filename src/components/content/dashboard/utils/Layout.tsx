import { motion } from "framer-motion"
import animateJourney from "@/layout/animations/FadeUp"

interface LayoutProps {
    children: any
}


export function Legend(props: LayoutProps) {
    return (
        <legend className="font-semibold text-2xl w-full max-md:text-lg p-1">
            {props.children}
        </legend>
    )
}

export function Box(props: LayoutProps) {
    return (
        <motion.div
            className="bg-white p-5 rounded-md shadow flex flex-col gap-5 w-full max-md:p-1"
            variants={animateJourney}
            initial="start"
            animate="visible"
            exit="end"
        >
            {props.children}
        </motion.div>
    )
}