import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './AuthorInfo.css';
const AuthorInfo = () => {
    const {authorId} = useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')

    const loadData = async () => {
        const response = await fetch(`/auth/userinfo/${authorId}`)
        const res = await response.json()
        if (!response.ok) {
          console.log(res.error)
        }
        if (response.ok) {
          const { name, email, avatar } = res
          setAvatar(avatar)
          setEmail(email)
          setName(name)
        }
      }

      useEffect(()=>{
        loadData()
      },[])

    return (
      <div className="authorinfo">
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Avatar:</p>
        <img src={avatar}/>
      </div>
    )
  }
  
  export default AuthorInfo