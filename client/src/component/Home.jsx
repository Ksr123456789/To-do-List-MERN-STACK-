import React, {  useContext, useEffect, useState } from 'react'
import axios from "axios"
import { TodoContext, server} from "../main"
import toast from 'react-hot-toast';
import TodoItems from './TodoItems';
import { Navigate } from 'react-router-dom';


const Home = () => {

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false)
  const {isAuthenticated} = useContext(TodoContext)

  const ToggleHandler = async (id)=>{
    try {
      const {data} = await axios.put(`${server}/task/${id}`,{},{
        withCredentials:true,
      })
      toast.success(data.message)
      setRefresh(prev=>!prev)

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const deleteHandler = async (id)=>{
    try {
      const {data} = await axios.delete(`${server}/task/${id}`,{
        withCredentials:true,
      })
      toast.success(data.message)
      setRefresh(prev=>!prev)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const submitHandler = async (e) =>{
    e.preventDefault();
    setLoading(true);
    try {
      const {data} = await axios.post(`${server}/task/add`, {
        title, description
      },{
        headers:{
          "content-Type":"application/json",
        },
        withCredentials:true, 

      })
      toast.success(data.message)
      setLoading(false);
      setTitle("");
      setDescription("");
      setRefresh(prev=> !prev)
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false);
    }
  }

  useEffect(()=>{
    axios.get(`${server}/task/getTasks`,{
      withCredentials:true,
    }).then((response)=>{
      setTasks(response.data.tasks)
    }).catch(e=>{
      toast.error(e.response.data.message)
    })
  },[refresh])

  if(!isAuthenticated) return <Navigate to={"/login"} />



  return (
    <div>

      <section>
      <form onSubmit={submitHandler}>
          <input required value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='title' />
          <input required value={description} onChange={(e)=>setDescription(e.target.value)} type="text" placeholder='description' />
          <button disabled={loading} type='submit'>Add</button>
          <h3>OR</h3>
        </form>
      </section>
      <section>
        {tasks.map((task)=>(
          <TodoItems
           key={task._id}
           title={task.title}
           description={task.description} 
           isCompleted={task.isCompleted}
           ToggleHandler={ToggleHandler}
           deleteHandler={deleteHandler}
           id={task._id}
           />
        ))}
      </section>
    </div>
  )
}

export default Home
