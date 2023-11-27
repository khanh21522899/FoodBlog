import {useState} from 'react'
import './Login.css'
import { useLogin } from '../hooks/useLogin'

const Login = () =>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState ('')

    const {login, isLoading, error} = useLogin()

    const handleSubmit = async (e)=>{
        e.preventDefault()

        await login(email, password)
    }


    return(
        <form className='login' onSubmit={handleSubmit}>
            <h3>Log in</h3>
 
            <label>Your email: 
            <input
                type="email"
                onChange= {(e)=>setEmail(e.target.value)}
                value = {email}
            />
            </label>
            <label>Your password: 
            <input
                type="password"
                onChange= {(e)=>setPassword(e.target.value)}
                value = {password}
            />
            </label>
            <input disabled={isLoading} id='submit-btn'
            type='submit'
            />
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Login