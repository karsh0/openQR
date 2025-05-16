import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Hompage';
import Dashboard from './pages/Dashboard';
import Signup from './pages/SIgnup';
import Signin from './pages/Signin';
import { Navbar } from './components/navbar';

function App() {
  return (
    <div className=" min-h-screen w-full text-black overflow-hidden relative">
      <BrowserRouter>
      <div className='fixed backdrop-blur-md top-0 w-full z-10'>
        <Navbar/>
      </div>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
