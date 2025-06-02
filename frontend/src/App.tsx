import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Hompage';
import Dashboard from './pages/Dashboard';
import { Navbar } from './components/navbar';

function App() {
  
  return (
    <div className={`min-h-screen w-full text-black overflow-hidden relative`}>
      <BrowserRouter>
      <div className='fixed backdrop-blur-md top-0 w-full z-10'>
        <Navbar/>
      </div>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
