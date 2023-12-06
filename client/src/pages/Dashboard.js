import { useEffect, useState } from "react"
import './Dashboard.css'
import {useAuthContext} from '../hooks/useAuthContext'
import {Link} from 'react-router-dom'



const Dashboard =  () =>{
    const {user} = useAuthContext()
    
    
    const [avatar, setAvatar] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    

    useEffect(()=>{
        if(!user){
            return
        }
        
        const loadData = async ()=>{
            const response = await fetch('/auth/dashboard', {
                headers:{
                    'authorization': `Bearer ${user.token}`
                }
            })
            const res = await response.json()
            if(!response.ok){
                console.log('cannot fetch data')
            }
            if(response.ok){
                const {name,email, avatar} = res
                setAvatar(avatar)
                setEmail(email)
                setName(name)
            }
        }
        if(user){
         loadData()
        }
       
    },[user])


 



    return(
        <div className = 'dashboard'>
            <div> blog card</div>
            <div className="info">
                <h3>User Information</h3>
              
                <div className='userInfo' >
                    <p>Your avatar</p>
                    <img id='avatar' width='100px' height='100px' alt='This is the avatar of user' src={avatar}/>
                    
                     
                    <p className="avatarStatus"></p>

                    <p>Your Name: {name}</p>

                    <p>Your email: {email}</p>
  
                    <Link to='/auth/dashboard/updateuser'>Change Information</Link>
                </div>
            </div>
        </div>

    )
}

export default Dashboard