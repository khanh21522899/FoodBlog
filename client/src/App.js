import {BrowserRouter, Routes, Route} from 'react-router-dom'


import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import Home from './pages/FakeHome';

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
      </Routes>
    </div>
    
  
    </BrowserRouter>
   </div>
  );
}

export default App;

