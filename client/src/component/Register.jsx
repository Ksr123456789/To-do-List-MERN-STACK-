import React ,{useContext, useState}from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from "axios"
import { TodoContext, server } from '../main';
import toast from "react-hot-toast"
function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated, setIsAuthenticated,loading, setLoading} = useContext(TodoContext);

  const submitHandler  = async (e)  =>{
    e.preventDefault();
    setLoading(true)
    try {
      const {data} = await axios.post(`${server}/user/new`, {
        name, email, password
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
        <form className='flex flex-col justify-center items-center mt-32 gap-4' onSubmit={submitHandler}>


        <input required value={name} onChange={(e)=>setName(e.target.value)} type="name" placeholder='name'className="input input-bordered w-full max-w-xs" />

        <input required value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Email' className="input input-bordered w-full max-w-xs" />

        <input required value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Password'className="input input-bordered w-full max-w-xs" />

          <div className='mt-4'>
          <button disabled={loading} type='submit' className="btn">Register</button>     
          </div>
          
          <div className='flex flex-col items-center gap-2'>
          <h3>OR</h3>
          <Link className='hover:text-blue-400 hover:underline' to={"/login"}>Do you have an account ?</Link>
          </div>
          
          
        </form>
      </section>
    </div>
  )
}

export default Register
