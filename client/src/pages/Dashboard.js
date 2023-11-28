import { useEffect, useState } from "react"
import './Dashboard.css'


const Dashboard =  () =>{

    
    const [avatar, setAvatar] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    
    const handleChange = (e) =>{
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () =>{
            setAvatar(reader.result)
        }
    }



    return(
        <div className = 'dashboard'>
            <div> blog card</div>
            <div className="info">
                <h3>User Information</h3>
                <form className='userInfo'>
                    <label>Your avatar
                    <input
                        type="file"
                        accept="image/png, image/jpg"
                        onChange= {handleChange}
                    />
                    <img id='avatar' width='150px' height='150px' alt='This is the avatar of user' src={avatar}/>
                    </label>
                    <label>Your Name
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
                    <button id='submit-btn'>Update</button>
                </form>
            </div>
        </div>

    )
}

export default Dashboard