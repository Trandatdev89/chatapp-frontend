import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {logoutServices} from "../Services/AuthServices";
import {isValidToken} from "../helper/isValidToken";

export default function Logout() {
    const navigate = useNavigate();

    
    useEffect(() => {
    
      const isvalid=isValidToken();
  
      if (isvalid) {
        const fetchAPI = async () => {
          const token=localStorage.getItem("token");
          const res = await logoutServices(token);
          localStorage.removeItem("token");
          navigate("/");
        };
        fetchAPI();
      }
    }, []);
  
    return<></>;
  }