import {createContext, useEffect, useReducer, useState} from 'react'



export const AuthContext = createContext()



export const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {user : action.payload, loading: false}
        case 'LOGOUT':
            return {user:null, loading: false}
        default:
            return state
    }
}


export const AuthContextProvider = ({children}) =>{
    
    const [state, dispatch] = useReducer(AuthReducer, {user: null, loading: true})
    //tracking the user state
    
    const [loading, setLoading] = useState(true)

    //initial check if user token is already in local storage or not
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({type:'LOGIN', payload: user})
        }
        else {
            dispatch({type: 'LOGOUT'})
        }
        setLoading(false)
    },[])

    console.log('authContext : ', state)

    if(loading){
        return <div>Loading...</div>
    }

    return (
        <AuthContext.Provider value = {{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}



