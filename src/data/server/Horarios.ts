import axios from "axios";
import { serverUrl } from "@/data/server/Config";

export async function fetchHorariosDiaBarbeiro(barber: number, day: any) {
    try {
        const response = await axios.get(
            `${serverUrl}/horarios-barbeiro-dia/${barber}/${day}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateHorario(id: number, level: boolean) {
    let status = 0
    if (level == true) {status = 0} else {status = 1}
    try {
        const response = await axios.post(
            `${serverUrl}/horario-status`, {
                id: id,
                status: status
            }
        )
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function fetchHorariosBarbeiro(barber: number, month: any) {
    try {
        const response = await axios.get(`${serverUrl}/horarios-status`, {
            params: { id: barber, month },
          });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function insertHorariosBarbeiro(barber: number, month: any) {
    try {
        const response = await axios.post(`${serverUrl}/insert-horarios-barbeiro-mes`,  
        { 
            barber_id: barber,
            month: month,
        })
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}