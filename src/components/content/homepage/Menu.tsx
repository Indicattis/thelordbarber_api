"use client"

import { IconBrandInstagram, IconClockPlus, IconUserCircle } from "@tabler/icons-react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MenuItemModel } from "@/data/Menu";
import animateJourney from "@/layout/animations/FadeUp";
import { useMediaQuery } from 'react-responsive';

interface MenuProps {
    itens: MenuItemModel[] 
}

function relocate(pathName: string) {
    window.location.href = pathName;
}   
export default function Menu(props: MenuProps) {
    const { itens } = props;
  
    return (
      <div className="flex flex-col justify-center gap-5 h-[400px] max-md:w-11/12 max-sm:w-[95%]">
        {itens.map(item => {
          return <MenuItem key={item.id} item={item}></MenuItem>
        })}
      </div>
    );
  }
  

interface MenuItemProps {
    item: MenuItemModel
}

function MenuItem(props: MenuItemProps) {
    const [over, setOver] = useState<boolean>(false)

    
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <div className={`text-white text-xl w-full border border-zinc-800 transition-all
        rounded-md bg-darkTheme cursor-pointer h-24 flex items-center
        overflow-hidden relative font-senthir
        ${over ? "border-white scale-105" : ""}`}
        onMouseOver={() => setOver(true)}
        onMouseLeave={() => setOver(false)}
        onClick={() => relocate(props.item.link)}>
            <div className={`w-24 text-zinc-800`}>
                {props.item.icon === "IconClockPlus" ? (
                    <IconClockPlus width={over ? 50 : 30} height={over ? 50 : 30}/>
                ): ""}
                {props.item.icon === "IconBrandInstagram" ? (
                    <IconBrandInstagram width={over ? 50 : 30} height={over ? 50 : 30}/>
                ): ""}
                {props.item.icon === "IconUserCircle" ? (
                    <IconUserCircle width={over ? 50 : 30} height={over ? 50 : 30}/>
                ): ""}
            </div>
            <div className="w-full">
                {props.item.name}
                {over || isMobile ? (
                <motion.div className="text-zinc-800 font-poppins"
                variants={animateJourney}
                initial="start"
                animate="visible"
                exit="end">
                    {props.item.desc}
                </motion.div>
            ) : ""}
            </div>
            
            <div className={`absolute right-0 max-lg:hidden transition-all
            ${over ? "w-[100px]" : "w-1/3"}`}>
                <Image src={`${props.item.image}`} alt=""width={300} height={0}/>
            </div>
            
        </div>
    )
}