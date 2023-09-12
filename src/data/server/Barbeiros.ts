// api.js
import axios from "axios";
import { serverUrl } from "@/data/server/Config";

export async function fetchBarbeiros() {
    try {
        const response = await axios.get(`${serverUrl}/barbeiros`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function fetchBarbeiro(id: number) {
    try {
        const response = await axios.get(`${serverUrl}/barber-id/${id}`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function insertBarbeiro() {
    try {
        const response = await axios.post(`${serverUrl}/post-insert-barber`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteBarbeiro(id: number) {
    try {
        const response = await axios.post(`${serverUrl}/post-delete-barbeiro/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateBarbeiro(id: number, data: any) {
    try {
        const response = await axios.put(
            `${serverUrl}/admin-set-all/${id}`,
            data
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateBarbeiroPassword(id: number, password: string) {
    try {
        const response = await axios.put(`${serverUrl}/admin-set-password`,  
        { 
            barber_id: id,
            password: password, 
        })
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}