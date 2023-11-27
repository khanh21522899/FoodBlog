import {useState} from 'react'
import './Signup.css'
import {useSignup} from '../hooks/useSignup'


const Signup = () =>{

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState ('')
    const {signup, isLoading, error} = useSignup()

    const handleSubmit = async (e)=>{
        e.preventDefault()

        await signup(name, email, password)
    }


    return(
        <form className='signup' onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Your name: 
            <input
                onChange= {(e)=>setName(e.target.value)}
                value = {name}
            />
            </label>
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
            {error && <div className='error'> {error} </div>}
        </form>
    )
}

export default Signup