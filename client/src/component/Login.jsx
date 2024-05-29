import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { TodoContext, server } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';
function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(TodoContext);
  
  const submitHandler  = async (e)  =>{
    e.preventDefault();
    setLoading(true)
    try {
      const {data} = await axios.post(`${server}/user/login`, {
         email, password
      },{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      
      toast.success(data.message)
      setIsAuthenticated(true);
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message)
      setIsAuthenticated(false);
      setLoading(false)
    }

  }

  if(isAuthenticated) return <Navigate to={"/"}/>


  return (
    <div>
      <section>
        <form onSubmit={submitHandler}>
          <input required value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Email' />
          <input required value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Password' />
          <button disabled={loading} type='submit'>Login</button>
          <h3>OR</h3>
          <Link to={"/register"}>Sign Up</Link>
        </form>
      </section>
    </div>
  )
}

export default Login
