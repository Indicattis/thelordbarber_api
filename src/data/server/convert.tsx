import axios from "axios";
import { serverUrl } from "@/data/server/Config";
import { useCallback, useEffect, useState } from "react";


interface NameProps {
    id: number
}

export function BarberName (props: NameProps) {
        const [name, setName] = useState<any>()
        const fetchData = useCallback(async () => {
            try {
                await axios
                    .get(
                        `${serverUrl}/barber-name-only/${props.id}`
                    )
                    .then((response) => {
                        setName(response.data.nome);
                    });
            } catch (error) {
                console.log(error);
            } finally {
            }
        }, [props.id]);

            useEffect(() => {
                fetchData();
            }, [fetchData]);

            
        return (
        <div>{name}</div>
        );
};


export function ClientName (props: NameProps) {
    const [name, setName] = useState<any>()
    // const fetchData = useCallback(async () => {
    //     try {
    //         await axios
    //         // .post(
    //             // `https://thelordbarber-server-git-main-indicattis.vercel.app/cliente-name/`,
    //             // props.id
    //         )
    //             .then((response) => {
    //                 setName(response.data.name);
    //             });
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //     }
    // }, [props.id]);

    //     useEffect(() => {
    //         fetchData();
    //     }, [fetchData()]);

        
    return (
    <div>{name}</div>
    );
};
// .get(
//     `https://thelordbarber-server-git-main-indicattis.vercel.app/barber-name-only/${props.id}`
// )