import { useEffect } from "react"
import { Blog } from "../components/blog"
import { useAuthContext } from '../hooks/useAuthContext'


const Home = () => {
  const {user, dispatch} = useAuthContext()
  const revalidate =async() => {
    const response = await fetch('/auth/dashboard', {
      headers: {
        'authorization': `Bearer ${user.token}`
      }
    })
    if (!response.ok) {
      window.alert('token expired')
      localStorage.removeItem('user')
      dispatch({type:'LOGOUT'})
      
    }
    if (response.ok) {
      console.log('token accepted')
    }
  }

  useEffect(()=>{
    revalidate()
  },[])

  return (
    <div>
      <Blog />
    </div>
  )
}

export default Home
