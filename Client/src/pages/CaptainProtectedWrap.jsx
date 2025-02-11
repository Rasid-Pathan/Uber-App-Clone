import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCaptainContext } from '../context/CaptainContext';
import axios from 'axios';


export default function CaptainProtectedWrap({ children }) {

    const navigate = useNavigate();
    const { captain, setCaptain, isLoading, setIsLoading } = useCaptainContext();

    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setCaptain(response.data)
                setIsLoading(false);
            }
        }).catch(err => {
            console.log(err);
            localStorage.removeItem('token');
            navigate('/captain-login')
        })
    }, [token])



    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl font-bold">Loading...</h1>
            </div>
        )
    }

    return (
        <>{children}</>
    )
}
