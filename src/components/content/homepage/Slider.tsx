'use client'

import { CorteModel } from "@/data/Cortes";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";



type SliderProps = {
    cortes: CorteModel[] 
}

export default function Slider(props:SliderProps) {
    return (
        
        <div className='relative w-full hidden h-full overflow-hidden rounded-md max-md:block'>
            <Carousel infiniteLoop autoPlay autoFocus showThumbs={false} emulateTouch>
            {props.cortes.map((corte) => (
                <div
                key={corte.id}
                className="w-full"
                >
                    <Image src={`/${corte.image}`} alt="" width={1000} height={1000}/>
                </div>
            ))}
            </Carousel>
        </div>
    )
}