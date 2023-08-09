import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import axios from "axios";
import Button from "@/components/button/Button";
import { Box, Legend } from "@/components/content/dashboard/utils/Layout";
import { serverUrl } from "@/data/server/Config";
import { useState } from "react";


interface SenhaClienteProps {
    barber_id: number
    feedbackToggle: (type: 'alert' | 'warning' | 'success', message: any) => void
}

export default function SenhaCliente(props:SenhaClienteProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [borderColor, setBorderColor] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setBorderColor("");
        if (password !== confirmPassword) {
            setBorderColor("border-red-400");
            return;
        }
        else {
            setBorderColor("border-blue-400");
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setBorderColor("");
    };

    const handleUpdatePassword = async () => {

        if (password !== confirmPassword) {
            setBorderColor("border-red-400");
            props.feedbackToggle('warning', 'Senhas não coincidem')
            return;
        }
        else {
            try {
                await axios.put(`${serverUrl}/admin-set-password`,  
                { 
                    barber_id: props.barber_id,
                    password: password, 
                })
                .then((response) => {
                  // Lógica após a alteração da senha (sucesso)
                  setPassword("");
                  setConfirmPassword("")
                })
                .catch((error) => {
                  // Lógica em caso de erro na chamada da API
                });
            }
            finally {
                props.feedbackToggle('success', 'Senha Alterada com sucesso!')
                setBorderColor("border-green-400");
            }
        }
    };
    return (
        <Box>
            <Legend>Troca de senha</Legend>
            <div className="flex w-full gap-5 text-sm text-center max-md:flex-col">
                <div className="w-full flex">
                    <div className="bg-zinc-200 w-[120px] p-5 font-semibold">Senha:</div>
                        <input
                        className={`bg-zinc-100 w-full p-5 border ${borderColor}`}
                        type={showPassword ? "text" : "password"}
                        placeholder="Senha"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                    
                <div className="w-full flex">
                <div className="bg-zinc-200 w-[120px] p-5 font-semibold">Senha:</div>
                <input
                    className={`bg-zinc-100 w-full p-5 border ${borderColor}`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirmar Senha"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                </div>
            
            </div>
            <div className="cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? (
                    <div className="flex items-center gap-2">
                        <IconEye />
                        Mostrar senha
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <IconEyeClosed />
                        Esconder Senha
                    </div>
                )}
            </div>
            
            
            

            <Button variant="blue" onClick={handleUpdatePassword}>
                <div className="text-base font-semibold">Atualizar Senha</div> 
            </Button>
        </Box>
    )
}