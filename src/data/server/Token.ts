"use client"

import jwt_decode from "jwt-decode";

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("token");
    return token || null;
  }
  return null;
};

export const getTokenInfo = (): { id: any; name: any; phone: any, image: number } | null => {
  const token = getToken();
  if (token) {
    try {
      const decodedToken: any = jwt_decode(token);
      const { id, name, phone, image } = decodedToken;
      return {
        id: id || "",
        name: name || "",
        phone: phone || "",
        image: image || "",
      };
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }
  return null;
};


// userUtils.ts

import { useEffect, useState } from 'react';

export const useUser = () => {
  const [userLoged, setUserLoged] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('')
  const [userPhone, setUserPhone] = useState()
  const [userID, setUserID] = useState()
  const [userImage, setUserImage] = useState(0)

  useEffect(() => {
    try {
      const tokenInfo = getTokenInfo();
      if (!tokenInfo) {
        setUserLoged(false);
      } else {
        // console.log('ID:', tokenInfo.id);
        // console.log('Nome:', tokenInfo.name);
        // console.log('Telefone:', tokenInfo.image);
        setUserLoged(true);
        setUserName(tokenInfo.name);
        setUserID(tokenInfo.id);
        setUserImage(tokenInfo.image);
        setUserPhone(tokenInfo.phone)
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { userLoged, userName, userID, userImage, userPhone};
};
