import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import WorkoutForm from './Components/WorkoutForm'
import LogIn from './Pages/LogIn'
import SignUp from './Pages/SignUp'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const [count, setCount] = useState(0)
  const {user} = useAuthContext();

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <div className="pages">
    <Routes>
      <Route path='/' element={ user ? <Home/> : <Navigate to='/login'/>}/> 
      <Route path='/login' element={ !user ? <LogIn/>: <Navigate to={'/'}/>}/>
      <Route path='/signup' element={ !user ? <SignUp/> : <Navigate to={'/'}/>}/>
    </Routes>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
