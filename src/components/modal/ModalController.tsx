import { IconArrowNarrowLeft } from '@tabler/icons-react';
import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import Button from '@/components/button/Button';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  legend: string;
  style?: 'black' | 'white'
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, legend, style }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className={`w-screen h-screen fixed top-0 left-0 transition-all
      bg-[#000000a9] items-center content-center overflow-y-auto z-[9999]
      ${
        isOpen ? 'flex' : 'hidden'
      }`}
    >
      <motion.div className={`flex text-white flex-col z-[9999]
      bg-darkTheme shadow-2xl shadow-black font-poppins relative
      max-h-screen w-[400px] h-auto overflow-hidden rounded-lg
      
      ${
        style == 'white' ? 'bg-white' : 'bg-darkTheme'
      }`}
      
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}>
        <div className=' absolute top-0 z-50 w-full bg-[#0000009f]'>
            <legend className='font-senthir flex p-4 items-center justify-end w-full border-b border-zinc-800'> {legend}</legend>
            <div className='absolute top-2'>
            <Button onClick={onClose} variant='default'>
                <IconArrowNarrowLeft className='w-8 h-full'></IconArrowNarrowLeft>
            </Button>
            </div>
        </div>
        <div className='w-full flex flex-col items-center justify-center
        h-full'>
            {children}
        </div>
      </motion.div>
      <AnimatePresence>
        initial={false}
        exitBeforeEter={true}
      </AnimatePresence>
    </motion.div>
  );
};

export default Modal;

