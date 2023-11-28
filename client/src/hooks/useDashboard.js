import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

export const useDashboard = () =>{

    

    const LoadUserData = async ()=>{
        const [isLoading, setIsLoading] = useState(null)
        const [error, setError] = useState(null)

        const token = JSON.parse(localStorage.getItem('user')).token
        setIsLoading(true)
        setError(null)
        const response = await fetch('/auth/dashboard', {
        method:'GET',
        body:JSON.stringify({token})
        })
      
        const jsonRes = response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(jsonRes.error)
        }
        if(response.ok){
            const {email, name, avatar} = jsonRes
            return ({email, name, avatar, isLoading, error})
        }
        
    }

    const UpdateUser = async()=>{
        const [isLoading, setIsLoading] = useState(null)
        const [error, setError] = useState(null)

        const token = JSON.parse(localStorage.getItem('user')).token
        setIsLoading(true)
        setError(null)



    }
        

        





}