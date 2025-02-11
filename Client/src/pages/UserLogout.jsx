import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function UserLogout() {
    const navigate = useNavigate();

    useEffect(()=> {
        const token = localStorage.getItem('token');
        console.log(token);
    
        
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if(response.status === 200){
                localStorage.removeItem('token');
                navigate('/login')
            }
        }).catch((error) => {
            console.error('Logout failed:', error);
            // Optionally, handle error here (e.g., navigate to a fallback page or show an error message)
        });
    },[navigate]);

    return (
        <div>UserLogout</div>
  )
}
