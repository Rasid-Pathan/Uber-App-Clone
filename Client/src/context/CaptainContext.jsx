import React, { createContext, useContext, useState } from 'react'

export const CaptainDataContext = createContext()

export default function CaptainContext({ children }) {

    const [captain, setCaptain] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const updateCaptain = (captainData) => {
        setCaptain(captainData)
    }

    return (

        <CaptainDataContext.Provider value={{ captain, setCaptain, isLoading, setIsLoading, error, setError, updateCaptain }}>
            {children}
        </CaptainDataContext.Provider>

    )
}

export const useCaptainContext = () => {
    const contextValue = useContext(CaptainDataContext)

    if (!contextValue) {
        throw new Error('useUserContext must be used within a UserContext')
    }
    return contextValue;
}
