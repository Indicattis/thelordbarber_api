import { useState } from "react"
import { motion } from "framer-motion"
import Button from "@/components/button/Button"
import animateJourney from "@/layout/animations/FadeUp"
import axios from "axios"
import { Box, Legend } from "@/components/content/dashboard/utils/Layout"
import Image from "next/image"
import { serverUrl } from "@/data/server/Config"

interface ClienteInfosProps {
    barber_id: number
    imagem: string
    cargo: string
    name: string
    login: string
}
export default function ClienteInfos(props:ClienteInfosProps) {
    const [hover, setHover] = useState<boolean>(false)
    const [sended, setSended] = useState<boolean>(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState<string | any>(null);
  
    const handleImageSelect = (event: any) => {
      const imageFile = event.target.files[0];
      setSelectedImage(imageFile);
  
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(imageFile);
    };

    const handleImageUpload = () => {
        if (!selectedImage) {
        alert('Selecione uma imagem');
        return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);

        axios.post(`${serverUrl}/admin-set-image/${props.barber_id}`, formData)
        .then((response) => {
            console.log(response.data);
            setSended(true)
            alert('Imagem enviada com sucesso!');
        })
        .catch((error) => {
            console.error(error);
            alert('Erro ao enviar a imagem');
        });
        // setSelectedImage(null);
        // setPreviewImage(null);
    };

    const handleImageClick = () => {
        if (!hover) {
            const inputElement = document.getElementById("upload-input");
            if (inputElement) {
                inputElement.click();
            }
        }
    };

    return (
        <Box>
            <Legend>Informações</Legend>
            <div className="flex w-full gap-5 items-center max-md:flex-col">
                <div className="">
                    <div
                        className="w-64 max-md:w-52 h-64
                        rounded-full overflow-hidden cursor-pointer transition-all relative"
                        onMouseOver={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        onClick={handleImageClick}
                    >
                        <Image
                            src={previewImage ? `/${previewImage}` : '/uploads/'+props.imagem}
                            alt="Pré-visualização"
                            className={`w-full h-full object-contain transition-all border border-dashed p-2 rounded-full ${hover && "blur-sm scale-105"}`}
                            width={200} height={200}
                        />
                        {
                            hover && (

                            <motion.label htmlFor="upload-input" className="absolute z-50 top-24 left-12 max-md:left-5 max-md:top-16
                            cursor-pointer p-5 rounded-sm text-white bg-[#000000e1]"
                            variants={animateJourney}
                            initial="start"
                            animate="visible"
                            exit="end">
                                Clique para alterar
                                <input
                                    id="upload-input"
                                    type="file"
                                    onChange={handleImageSelect}
                                    style={{ display: "none" }}
                                />
                            </motion.label>
                            )
                        }
                    </div>
                    {previewImage && (
                    <motion.div
                        className="flex w-full"
                        variants={animateJourney}
                        initial="start"
                        animate="visible"
                        exit="end"
                    >
                        <Button variant={sended ? "primary" : "green"} onClick={handleImageUpload} disabled={sended && true}>
                            {sended ? "Atualize a página" : "Enviar Imagem"}
                            
                        </Button>
                    </motion.div>
                    )}
                </div>
                <div className="w-full flex flex-col gap-5 text-sm text-center">
                
                    <input
                        className="bg-zinc-100 p-5 rounded-md"
                        placeholder={`Número de Identificação: ${props.barber_id}`}
                        type="number"
                        disabled
                    />
                    <input
                        className="bg-zinc-100 p-5 rounded-md"
                        placeholder={`Nome: ${props.name}`}
                        type="text"
                        disabled
                    />
                    <input
                        className="bg-zinc-100 p-5 rounded-md"
                        placeholder={`Cargo: ${props.cargo}`}
                        type="text"
                        disabled
                    />
                    
                    <input
                        className="bg-zinc-100 w-full p-5 rounded-md"
                        placeholder={`Usuário: ${props.login}`}
                        type="text"
                        disabled
                    />
                        
                </div>
            </div>
            
            
            
        </Box>
    )
}
