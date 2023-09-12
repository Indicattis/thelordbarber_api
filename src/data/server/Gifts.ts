import axios from "axios";
import { serverUrl } from "@/data/server/Config";

export async function insertGifts() {
    try {
        const response = await axios.post(`${serverUrl}/insert-gifts`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function fetchGifts() {
    try {
        const response = await axios.get(`${serverUrl}/get-gifts`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function rescueGift(client: string) {
    try {
        const response = await axios.post(`${serverUrl}/rescue-gift/${client}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}