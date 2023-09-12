import axios from "axios";
import { serverUrl } from "@/data/server/Config";

export async function fetchAgendamentosDia(today: any) {
    try {
        const response = await axios.get(`${serverUrl}/agendamentos-dia/${today.format('YYYY-MM-DD')}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function fetchAgendamentosMes(month: any) {
    try {
        const response = await axios.get(
            `${serverUrl}/agendamentos-mes/${month}`
          );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function fetchAgendamentosDiaBarbeiro(barber: any, day: any) {
    try {
        const response = await axios.get(
            `${serverUrl}/agendamentos-barbeiro-dia/${barber}/${day}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function fetchAgendamentosCliente(phone: any) {
    try {
        const response = await axios.get(
            `${serverUrl}/agendamentos-cliente`,
            {
              params: {
                cliente: phone,
              },
            }
          );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function fetchAgendamentosMesBarbeiro(barber: any, month: any) {
    try {
        const response = await axios.get(
            `${serverUrl}/horarios-barbeiro-mes/${month}/${barber}`
          );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function fetchAgendamentosInsights(barber: any, selectedDays: any) {
    try {
        const response = await axios.get(`${serverUrl}/horarios-barbeiro/${barber}/${selectedDays}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
