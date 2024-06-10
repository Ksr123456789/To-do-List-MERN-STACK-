import React, { useContext } from 'react'
import {Link} from "react-router-dom"
import { TodoContext, server } from '../main'
import axios from 'axios';
import toast from 'react-hot-toast';
const Header = () => {
  const {isAuthenticated ,setIsAuthenticated, loading, setLoading} = useContext(TodoContext);

  const logOutHandler  = async ()  =>{
    setLoading(true);
    try {
      const {data} = await axios.get(`${server}/user/logout`,{  
        withCredentials:true
      })
      
      toast.success(data.message)
      setLoading(false);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false);
      setIsAuthenticated(true);
    }

  }


  return (
    <nav className='mt-4 flex justify-between'>
      
        <h2 className='ml-4 text-xl font-bold text-gray-500'>TODO App</h2>
      
      <article className='flex gap-20' >
        <Link className='hover:text-red-500 font-bold hover:underline'  to={"/"}>Home</Link>
        <Link className='hover:text-red-500 font-bold hover:underline' to={"/profile"}>Profile</Link>
        {
          isAuthenticated ? <button className='mr-4 hover:text-red-500 font-bold hover:underline'  disabled={loading} onClick={logOutHandler}>logout</button>: <Link 
          className='pr-4 hover:text-red-500 font-bold hover:underline' to={"/login"}>login</Link>
        }

      </article>
    </nav>
  )
}

export default Header
