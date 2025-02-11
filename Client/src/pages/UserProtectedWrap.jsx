import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';


export default function UserProtectedWrap({children}) {

    const navigate = useNavigate();
    const {user,setUser,isLoading,setIsLoading} = useUserContext();
    const token = localStorage.getItem('token')

    

    useEffect(() => {
        if(!token){
            navigate('/login')
        }
        
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response)=>{
            if(response.status === 200){
                setUser(response.data)
                setIsLoading(false);
            }
        }).catch(err=>{
            console.log(err);
            localStorage.removeItem('token');
            navigate('/login')
        })

    }, [token])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
              <h1 className="text-2xl font-bold">Loading...</h1>
            </div>
          );
    }


  return (
    <>{children}</>
  )
}
