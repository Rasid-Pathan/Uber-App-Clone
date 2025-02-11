import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios';

export const UserDataContext = createContext()

export default function UserContext({ children }) {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [token, setToken] = useState(localStorage.getItem('token')); // Track token state

    
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUser(response.data);
                    // console.log('response',response.data,'user',user);
                    
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
            setIsLoading(false);
        };
        fetchUser();
    }, []);

    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken); // Update token state to trigger useEffect
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <UserDataContext.Provider value={{ user, setUser, login, logout, isLoading, setIsLoading }}>
            {children}
        </UserDataContext.Provider> 
    )
}

export const useUserContext = () => {
    const contextValue = useContext(UserDataContext)

    if (!contextValue) {
        throw new Error('useUserContext must be used within a UserContext')
    }
    return contextValue;
}
