import {useState} from 'react'
import './Login.css'
import { useLogin } from '../hooks/useLogin'
import {Link} from 'react-router-dom'

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
 
            <label>Email: 
            <input
                type="email"
                onChange= {(e)=>setEmail(e.target.value)}
                value = {email}
                
            />
            </label>
            <label>Password: 
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
            <Link to='/auth/signup'>To Signup</Link>
        </form>
        
    )
}

export default Login