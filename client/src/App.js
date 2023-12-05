import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';


import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import Home from './pages/FakeHome';
import Dashboard from './pages/Dashboard';
import UpdateUser from './pages/UpdateUser';


function App() {


  const { user } = useAuthContext()
  
  
  

  return (
   <div className='App'>
    <BrowserRouter>
    
    <div className='Pages'>
      <Routes>

        <Route
          path='/'
          element={<Home/>}
        />
        
        <Route
        path='/auth/login'
        element={!user ?<Login/> : <Navigate to='/'/>}
        />

        <Route
        path='/auth/signup'
        element={ !user ? <Signup/> : <Navigate to='/'/>}
        />

        <Route
        path='/auth/dashboard'
        element={user ? <Dashboard/> : <Navigate to='/auth/login'/>}
        />

        <Route
        path='/auth/dashboard/updateuser'
        element={user ? <UpdateUser/> : <Navigate to='/auth/login'/>}
        />

      </Routes>
      
    </div>
    
  
    </BrowserRouter>
   </div>
  );
}

export default App;

