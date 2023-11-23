import { Blog } from "./components/blog";
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>


  )
}

export default App;
