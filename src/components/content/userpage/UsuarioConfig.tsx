import { IconDeviceMobile, IconEdit } from '@tabler/icons-react';
import Button from '@/components/button/Button';
import useProcess from '@/data/hooks/useProcess';
import { changeName, changePass } from '@/data/server/Cliente';
import { motion } from 'framer-motion';
import animateJourney from '@/layout/animations/FadeUp';
import Image from 'next/image';
import { useState } from 'react';

interface UserConfigProps {
    phone: any;
    name: string;
    id: number | undefined;
    image: number;
    result: (type: 'warning' | 'alert' | 'success', message: string) => void;
}

export default function UserConfig({
    phone,
    name,
    id,
    image,
    result,
}: UserConfigProps) {
    const { processing, processInit, processEnd } = useProcess();

    const [isEdit, setEdit] = useState<boolean>(false);
    const [editPass, setEditPass] = useState<boolean>(false);

    const [repeatPassword, setRepeatPassword] = useState('');
    const [password, setPassword] = useState('');
    const [newName, setNewName] = useState('');

    const handleRepeatPasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { value } = event.target;
        setRepeatPassword(value);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { value } = event.target;
        setPassword(value);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setNewName(value);
    };

    const alterUserData = async () => {
        processInit();
        if (editPass) {
            if (password !== repeatPassword) {
                processEnd();
                result('alert', 'As senhas não coincidem');
                return;
            }
            else {
                try {
                    const response = await changePass(password, id);
                    if (response.data.message) {
                        result('success', 'Dados Alterados!');
                    } else {
                        result('warning', 'Erro ao realizar o atualização');
                    }
                } finally {
                }
            }
        } 

        try {
            const response = await changeName(newName, id);
            if (response.data.message) {
                result('success', 'Dados Alterados!');
            } else {
                result('warning', 'Erro ao realizar o atualização');
            }
        } finally {
            processEnd();
            setEdit(false)
            setEditPass(false)
        }
        
    };

    return (
        <motion.div
            className="flex gap-5 rounded-sm max-md:w-[90%] max-md:flex-col"
            variants={animateJourney}
            initial="start"
            animate="visible"
            exit="end"
        >
            <div
                className="flex w-full gap-5 items-center text-white bg-darkTheme mt-20  border border-zinc-800 text-sm
                    p-3 rounded-sm"
            >
                {isEdit ? (
                    <div className="font-sans w-full flex flex-col gap-2">
                        <div className=" border rounded-full border-yellow-600 mt-[-60px]">
                            <Image
                                priority property="priority" 
                                alt=""
                                className="w-full h-full"
                                src={`/user/${image}.png`}
                                width={70}
                                height={70}
                            ></Image>
                        </div>
                        <div>Editar informações</div>
                        <input
                            type="text"
                            className="bg-black outline-none p-3 w-full rounded-md"
                            defaultValue={name}
                            onChange={(event) => handleNameChange(event)}
                        />

                        <input
                            type="text"
                            placeholder={phone?.toString()}
                            value={phone}
                            className="bg-black outline-none p-3 w-full rounded-md"
                            disabled
                        />
                        {editPass && (
                            <div className="w-full flex flex-col gap-2">
                                <input
                                    type="text"
                                    placeholder="Nova Senha"
                                    className="bg-black outline-none p-3 w-full rounded-md"
                                    onChange={(event) =>
                                        handlePasswordChange(event)
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Repetir Nova Senha"
                                    className="bg-black outline-none p-3 w-full rounded-md"
                                    onChange={(event) =>
                                        handleRepeatPasswordChange(event)
                                    }
                                />
                            </div>
                        )}
                        <div className="w-full font-sans flex gap-5">
                            <Button
                                variant="light"
                                onClick={() => setEditPass(!editPass)}
                            >
                                Alterar Senha
                            </Button>
                        </div>

                        <div className="w-full font-sans flex gap-5">
                            <Button
                                variant="red"
                                onClick={() => setEdit(false)}
                            >
                                Cancelar
                            </Button>
                            <Button variant="green" onClick={() => alterUserData()}>Salvar</Button>
                        </div>
                    </div>
                ) : (
                    <div className="font-sans w-full flex flex-col gap-2">
                        <div className=" border rounded-full border-yellow-600 mt-[-60px]">
                            <Image
                                alt=""
                                className="w-full h-full"
                                src={`/user/${image}.png`}
                                width={70}
                                height={70}
                            ></Image>
                        </div>
                        <div className="px-2 text-zinc-600">Código: {id}</div>
                        <div className="px-2 text-base font-medium">{name}</div>
                        <div className="px-2 flex gap-1 items-center">
                            <IconDeviceMobile width={15} />
                            {phone}
                        </div>
                        <div className="w-full font-sans flex gap-5">
                            <Button
                                variant="light"
                                onClick={() => setEdit(!isEdit)}
                            >
                                Editar
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
