import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function CaptainLogout() {
    const navigate = useNavigate();

    useEffect(()=> {
        const token = localStorage.getItem('token');
        console.log(token);
    
        
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if(response.status === 200){
                localStorage.removeItem('token');
                navigate('/captain-login')
            }
        }).catch((error) => {
            console.error('Logout failed:', error);
            // Optionally, handle error here (e.g., navigate to a fallback page or show an error message)
        });
    },[navigate]);

    return (
        <div>CaptainLogout</div>
  )
}
