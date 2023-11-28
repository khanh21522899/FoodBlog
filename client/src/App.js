import {BrowserRouter, Routes, Route} from 'react-router-dom'


import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import Home from './pages/FakeHome';
import Dashboard from './pages/Dashboard';

function App() {
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
        element={<Login/>}
        />
        <Route
        path='/auth/signup'
        element={<Signup/>}
        />
        <Route
        path='/auth/dashboard'
        element={<Dashboard/>}
        />
      </Routes>
    </div>
    
  
    </BrowserRouter>
   </div>
  );
}

export default App;

