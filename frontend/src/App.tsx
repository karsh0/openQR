import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Hompage'
import Dashboard from './pages/Dashboard'
import Signup from './pages/SIgnup'
import Signin from './pages/Signin'

function App() {
 return <div className='bg-black w-screen h-screen text-white'>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  
 </div>
}

export default App
