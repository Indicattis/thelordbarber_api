'use client'

import HorariosUsuario from "@/components/content/userpage/HorariosUsuario";
import UserConfig from "@/components/content/userpage/UsuarioConfig";
import UserInsights from "@/components/content/userpage/UsuarioInsights";
import FeedbackWrapper from "@/components/feedback/FeedBackWrapper";
import { FeedBackProps } from "@/components/feedback/template";
import Header from "@/components/header/Header";
import { getTokenInfo, useUser } from "@/data/server/Token";
import { useCallback, useEffect, useState } from "react";




export default function Usuario() {
    const { userLoged, userName, userID, userImage, userPhone } = useUser();

    const [feedbackType, setFeedbackType] = useState<"warning" | "alert" | "success">('alert')
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState<boolean>(false);

    const feedbackController = (type: "warning" | "alert" | "success", message: string) => {
        setFeedbackType(type)
        setFeedbackMessage(message);
        setShowFeedback(true);
    }

    const Auth = useCallback( async () => {
        try {
            const tokenInfo = await getTokenInfo();
            if (!tokenInfo) {
              window.location.href = '/login';
            } else {
            }
        }
        finally {

        }
      }, []); 

    useEffect( () => {
        Auth()
    },[Auth])


    return (
        <main>
            <Header></Header>
            <section className="flex w-4/5 gap-10 relative z-0 mt-10
        max-md:flex-col 
        max-md:w-full">
                <div className="w-1/2 max-md:w-full">
                    <UserConfig result={(type, message) => feedbackController(type, message)} id={userID} image={userImage} name={userName} phone={userPhone}></UserConfig>
                </div>
                <div className="w-1/2 max-md:w-full">
                    <UserInsights id={userID && userID}></UserInsights>
                </div>
            </section>
            <section className="flex w-4/5 gap-10 relative z-0 mt-10
        max-md:flex-col 
        max-md:w-full">
                <div className="w-full">
                    <HorariosUsuario   cliente={userPhone}></HorariosUsuario>
                </div>
            </section>
            {showFeedback && (
                <FeedbackWrapper
                result={true}
                feedbackProps={{
                    message: feedbackMessage,
                    type: feedbackType,
                    onClick: () => setShowFeedback(false)
                }}
                />
            )}
        </main>
    )
}

function showFeedback(
    type: 'warning' | 'alert' | 'success',
    message: string
) {
    const feedbackProps: FeedBackProps = {
        message,
        type,
        onClick: () => {
            // Função opcional para lidar com o clique no botão de fechar (se necessário)
            // Aqui, você pode definir a lógica para fechar o feedback se necessário
        },
    };

    return <FeedbackWrapper result={true} feedbackProps={feedbackProps} />;
}
