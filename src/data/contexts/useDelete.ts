import axios from "axios";
import { serverUrl } from "@/data/server/Config";

export default function dataDelete(table: string, id: number | undefined) {

    switch (table) {
        case 'agendamento':
            try {
            axios.post(`${serverUrl}/post-delete-agendamento/${id}`)
            } catch (error) {
            console.log(error);
            }
            break;
        case 'cliente':
            try {
            axios.post(`${serverUrl}/post-delete-cliente/${id}`);
            } catch (error) {
            console.log(error);
            }
        
        case 'barbeiro':
            try {
            axios.delete(`${serverUrl}/post-delete-barbeiro/${id}`);
            } catch (error) {
            console.log(error);
            }
        default:
            break;
    }
    
}