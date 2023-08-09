// api.ts
import axios from 'axios';
import { serverUrl } from '@/data/server/Config';

export const checkUserExistence = async (phoneNumber: number) => {
  const checkData = {
    phone: phoneNumber,
  };

  try {
    const response = await axios.post(
      `${serverUrl}/cliente-name/`,
      checkData
    );
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const handleSign = async (userData: any) => {
        
    try {
        const response = await axios.post(
                `${serverUrl}/post-insert-client`,
                userData
            );
    return response;
    } catch (error) {
    console.error(error);
    throw error;
    }
}

export const changeName = async (userName: any, id: any) => {
    try {
        const response = await axios.put(
            `${serverUrl}/alter-client-name`,  
            { 
                id: id,
                name: userName, 
            });
    return response;
    } catch (error) {
    console.error(error);
    throw error;
    }
}

export const changePass = async (userPass: any, id: any) => {
    try {
        const response = await axios.put(
            `${serverUrl}/alter-client-password`,  
            { 
                id: id,
                password: userPass, 
            });
    return response;
    } catch (error) {
    console.error(error);
    throw error;
    }
}



export const handleLogin = async (phone: any, password: any) => {
    const phoneNumber = parseInt(phone.replace(/[^0-9]/g, ''), 10);
    const data = {
        phone: phoneNumber,
        password: password
    }
    try {
        const response = await axios.post(`${serverUrl}/client-login`, data);
        
        sessionStorage.setItem('token', response.data.token);

        return response.data

    } catch (error) {
        throw error;
    }
};


export const getToken = () => {
    return sessionStorage.getItem('token');
};