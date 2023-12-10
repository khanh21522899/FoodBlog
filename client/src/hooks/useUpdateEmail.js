import { useState } from "react";
import {useAuthContext} from '../hooks/useAuthContext'


export const useUpdateEmail= () =>{

        const [emailPending, setEmailPending] = useState(false)
        const [emailError, setEmailError] = useState('')

        

        const {user} = useAuthContext()
    
     


        const updateEmail = async (email) =>{
            if(!user){
                return
            }
            setEmailError('')
            setEmailPending(true)
            
            const response = await fetch('/auth/dashboard/updateuser/changeemail', {
                method:'PUT',
                headers:{
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                },
                body:JSON.stringify({email})
                })
    
            const jsonRes = await response.json()
            if(!response.ok){
                setEmailPending(false)
                setEmailError(jsonRes.error)
                
            }
            if(response.ok){
                setEmailPending(false)
                setEmailError(jsonRes.message)
            }
        }

        return {updateEmail, emailPending, emailError}
}