import axios from "axios";
import { serverUrl } from "@/data/server/Config";

export async function fetchRecurrenceUsers() {
    try {
        const response = await axios.get(`${serverUrl}/insights-recurrence-users`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}