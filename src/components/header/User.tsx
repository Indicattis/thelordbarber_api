
import { IconGridDots } from "@tabler/icons-react";
import axios from "axios";
import useProcess from "@/data/hooks/useProcess";
import { useUser } from "@/data/server/Token";
import Image from "next/image";
import React, { useEffect, useState } from 'react';

export default function UserProfile() {
    const { userLoged, userName, userID, userImage } = useUser();
    const { processing, processInit, processEnd } = useProcess()

    // const getImage = async () => {
    //     processInit()
    //     try {
    //         const response = await axios.get(`https://thelordbarber-server-git-main-indicattis.vercel.app/cliente-image`, {
    //             params: {
    //                 id: userID
    //             } 
    //         });
    //         setUserImage(response.data)
    //     }
    //     finally {
    //         processEnd()
    //     }
    // }

    // useEffect(() => {
    // getImage()
    // }, [userID])

  return (
    <div className=" flex gap-3 h-full items-center cursor-pointer hover:text-white transition-all"
    onClick={() => window.location.href = '/usuario'}>
        {userLoged ? (
            <div className=" flex gap-3 h-full items-center cursor-pointer hover:text-white transition-all"
            onClick={() => window.location.href = '/usuario'}>
                <Image alt="" priority property="priority" src={`/user/${userImage}.png`} width={30} height={30}></Image>
                <div className="text-sm font-sans max-md:hidden">
                    {userName}
                </div>
            </div>
        ) : ""}
    </div>
  )
}