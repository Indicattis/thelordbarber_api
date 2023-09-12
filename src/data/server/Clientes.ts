import axios from "axios";
import { serverUrl } from "@/data/server/Config";

export async function fetchClientes() {
    try {
        const response = await axios.get(`${serverUrl}/clientes`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function fetchCliente(id: number) {
    try {
        const response = await axios.get(
            `${serverUrl}/clientes-id/${id}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateCliente(id: number, requestData: any) {
    try {
        const response = await axios.put(
            `${serverUrl}/cliente-set-all/${id}`,
            requestData
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}