import React, { useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { resfreshTokenService } from '../Services/AuthServices';


export default function RefreshToken(token) {
    const data=useSelector((state)=>state.ReloadUser);
    
    useEffect(() => {
      const fetchToken = async () => {
          const res = await resfreshTokenService(token);
          console.log("Token refreshed:", res.data.token);
          localStorage.setItem("token", res.data.token);
      };
  
      fetchToken();
    }, [data]);
  }
  