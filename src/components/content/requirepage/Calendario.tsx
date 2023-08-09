import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import dayjs from "dayjs";
import animateJourney from "@/layout/animations/FadeUp";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"
import { generateDate, months } from "@/utils/Calendar";
import Button from "@/components/button/Button";

interface CalendarioProps {
    setDay: (sendDay: string) => void
}

export default function Calendario({ setDay }: CalendarioProps) {
    const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
    const currentDate = dayjs();

    const [today, setToday] = useState(currentDate);
    const [selectDate, setSelectDate] = useState(currentDate);
    const [buttonClicked, setButtonClicked] = useState(false);

    useEffect(() => {
        if (buttonClicked) {
            setDay(selectDate.toString());
            setButtonClicked(false);
        }
    }, [buttonClicked, selectDate, setDay]);

    return (
        <motion.div className="flex m-2 rounded-sm max-md:flex-col w-full"
            variants={animateJourney}
            initial="start"
            animate="visible"
            exit="end">
            <div className="w-full rounded-md">
                <div className="w-full text-sm italic text-zinc-800">
                    <p>{months[today.month()]}, {today.year()}</p>
                </div>
                <div className="text-lg flex items-center justify-evenly h-14">
                    <div className="flex items-center justify-evenly w-1/2 font-poppins gap-10">
                        <IconChevronLeft
                            className="cursor-pointer rounded-full hover:text-[#db9b33] transition-all"
                            onClick={() => {
                                setToday(today.month(today.month() - 1));
                            }}
                        />
                        <div className="cursor-pointer px-4 rounded-sm hover:bg-zinc-800 transition-all"
                            onClick={() => {setToday(currentDate);}}>Hoje
                        </div>
                        <IconChevronRight
                            className="cursor-pointer rounded-full hover:text-[#db9b33] transition-all"
                            onClick={() => {
                                setToday(today.month(today.month() + 1));
                            }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-7">
                    {days.map((day, index) => {
                        return (
                            <h1
                                key={index}
                                className="p-4 flex justify-center items-center text-sm"
                            >
                                {day}
                            </h1>
                        );
                    })}
                </div>
                <div className="w-full font-poppins grid grid-cols-7 gap-2 border-t pt-3">
                    {generateDate(today.month(), today.year()).map(
                        ({ date, currentMonth, today, ignore, sunday }, index) => {
                            const isSunday = date.day() === 0; // Verifica se é domingo
                            return (
                                <div
                                    key={index}
                                    className={`
                                    h-12 w-12 flex justify-center
                                    items-center
                                    rounded-md transition-all
                                    hover:text-whiteColor
                                    ${currentMonth
                                            ? "border border-zinc-600 cursor-pointer"
                                            : "text-zinc-800 border-hidden pointer-events-none"
                                        }
                                    ${selectDate.toDate().toDateString() ==
                                            date.toDate().toDateString()
                                            ? "bg-[#db9b33] border text-[#fff] border-[#db9b33]"
                                            : "bg-darkTheme border-zinc-700"
                                        }
                                    ${isSunday ? " text-zinc-800 cursor-no-drop border-none pointer-events-none" : ""}
                                    ${ignore ? "text-zinc-800 cursor-not-allowed border-none pointer-events-none" : ""}
                                    ${today ? "text-[#db9b33] border border-[#db9b33]" : ""}
                                    `}
                                    onClick={() => {setSelectDate(date);}}>
                                    {date.date()}
                                </div>
                            );
                        }
                    )}
                </div>
                <div className="w-full flex justify-center mt-5 font-poppins">
                    <Button variant="primary" onClick={() => {setButtonClicked(true);}}> Próximo </Button>
                </div>
            </div>
        </motion.div>
    );
}
