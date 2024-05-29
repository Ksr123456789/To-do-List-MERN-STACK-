import {BrowserRouter  as Router, Routes, Route} from "react-router-dom"
import './App.css'
import Home from "./component/Home"
import Header from "./component/Header"
import Login from "./component/Login"
import Profile from "./component/Profile"
import Register from "./component/Register"
import { Toaster } from "react-hot-toast"
import { useContext, useEffect } from "react"
import { TodoContext, server } from "./main"
import axios from "axios"


function App() {

  const {setUser,isAuthenticated, setIsAuthenticated} = useContext(TodoContext)
  useEffect(()=>{
    axios.get(`${server}/user/profile`,{
      withCredentials:true,
    }).then(res=>{
      setUser(res.data.user)
      setIsAuthenticated(true)
    }).catch((error)=>{console.log(error)
      setIsAuthenticated(false);
    })
  },[isAuthenticated])

  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      <Toaster/>
    </Router>
    </>
  )
}

export default App
