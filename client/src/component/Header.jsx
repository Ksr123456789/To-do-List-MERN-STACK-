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
    <nav>
      <div>
        <h2>todo app</h2>
      </div>
      <article >
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {
          isAuthenticated ? <button disabled={loading} onClick={logOutHandler}>logout</button>: <Link to={"/login"}>login</Link>
        }

      </article>
    </nav>
  )
}

export default Header
