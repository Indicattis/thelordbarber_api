"use client"

import Logo from '@/components/header/Logo';
import Toggle from '@/components/header/Toggle';
import UserProfile from '@/components/header/User';
import React, { useState } from 'react';



export default function Header() {

function relocate(pathName: string) {
window.location.pathname = pathName;
}

  return (
    <header className="w-full h-12 border-b-2 border-black-400 bg-darkTheme flex content-center relative">
      <nav className={`
          flex gap-5 
          justify-center 
          max-w-[100px]
          font-medium
          text-textColor
          bg-darkTheme`}
      >
        <Logo></Logo>
        <HeaderItem onClick={() => relocate("/")}>Home</HeaderItem>
        <HeaderItem onClick={() => relocate("/agendamento")}>Agendamento</HeaderItem>
        <HeaderItem onClick={() => relocate("/usuario")}>Conta</HeaderItem>
        <div className='absolute right-5 max-md:right-0 h-full flex gap-3'>
            <UserProfile></UserProfile>
            <Toggle></Toggle>
        </div>
      </nav>
    </header>
  );
}

interface HeaderItemProps {
  children: any
  onClick?: () => void
}

function HeaderItem(props: HeaderItemProps) {
    const [showCase, setShowCase] = useState<Boolean>(false)
  return (
    <div className="p-3 cursor-pointer transition-all hover:text-white max-md:hidden font-senthir"
     onClick={props.onClick}
     onMouseLeave={() => setShowCase(showCase == false)}
     onMouseOver={() => setShowCase(showCase == false)}
     >
      {props.children}
      <div>
      {showCase && (

        <div></div>
      )}

      </div>
    </div>
  )
}
