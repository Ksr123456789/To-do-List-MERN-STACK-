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
        <form onSubmit={submitHandler} className='mt-32 flex flex-col justify-center items-center gap-10'>


        <input required value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Email'className="input input-bordered w-full max-w-xs" />
        <input  required value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Password' className="input input-bordered w-full max-w-xs" />

        <button disabled={loading} type='submit' className="btn w-20">Login</button>


         <div className='flex flex-col justify-center items-center gap-2'>
           <h3 className='font-bold'>OR</h3>
           <Link className='hover:text-blue-700 hover:underline ' to={"/register"}>{`don't have an account !!`}</Link>
        </div> 
          
        </form>
      </section>
    </div>
  )
}

export default Login
