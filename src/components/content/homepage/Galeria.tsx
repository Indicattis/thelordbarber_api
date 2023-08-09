'use client'
import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import Modal from "@/components/modal/ModalController";
import { CorteModel } from "@/data/Cortes";
import { motion } from "framer-motion";
import animateJourney from "@/layout/animations/FadeUp";

interface GaleriaProps {
    cortes: CorteModel[] 
}


export default function Galeria(props: GaleriaProps) {
  const [selectedCorte, setSelectedCorte] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleItemClick = (corte: any) => {
    setSelectedCorte(corte);
    setModalOpen(true);
  };

  return (
    <div className="mt-5 grid grid-cols-4 gap-5 shadow-md rounded-lg max-md:hidden
        max-sm:grid-cols-1
        max-md:grid-cols-2
        max-lg:grid-cols-3"
        
    >
      {props.cortes.map((corte) => (
        <button
          key={corte.id}
          className="w-full"
          onClick={() => handleItemClick(corte)}
        >
          <Photo cortes={corte} />
        </button>
      ))}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} legend="Picture">
        <div className="pointer-events-none">
            {selectedCorte && <Photo cortes={selectedCorte} />}
        </div>
      </Modal>
    </div>
  );
}

interface PhotoProps {
    cortes: CorteModel
}

function Photo(props: PhotoProps) {
    const [over, setOver] = useState<boolean>(false)
    return (
        <div className={`w-full transition-all cursor-pointer relative overflow-hidden
        ${over ? "scale-105" : "scale-100"}`}
            onMouseOver={() => setOver(true)}
            onMouseLeave={() => setOver(false)}>
            <div className="w-full border border-zinc-800 rounded-lg overflow-hidden">
                <Image alt="" src={`/${props.cortes.image}`} width={1000} height={1000}/>
            </div>
            
            
            {over && (
                <motion.div className={`flex p-3 mt-2 text-zinc-800 justify-evenly 
                items-center w-full bg-[#00000085] absolute bottom-0 h-full
                `}
                variants={animateJourney}
                initial="start"
                animate="visible"
                exit="end">
                    <div className="text-white w-1/2">
                        <Image src="/img/beard--logo.png" alt="" width={1000} height={1000}/>
                    </div>
                </motion.div>
            )}
        </div>
        
    )
}