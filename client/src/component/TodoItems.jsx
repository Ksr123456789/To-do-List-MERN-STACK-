import React, { useEffect, useState } from 'react'
import {server} from '../main'
import axios from 'axios';
import toast from 'react-hot-toast';

const TodoItems = ({title, description, isCompleted, ToggleHandler, deleteHandler, id}) => {

  const[inputTitle, setInputTitle] = useState(title);
  const[inputDesc, setInputDesc] = useState(description);
  const [refresh, setRefresh] = useState(false);

  const updateHandler= async (id)=>{
    try {
      const {data} = await axios.put(`${server}/task/update/${id}`,
      {
        title:inputTitle,
        description:inputDesc
      },{
        headers:{
          "content-Type":"application/json"
        },
        withCredentials:true
      }
    )
    toast.success(data.message)
    setRefresh(prev=>!prev);
   
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(()=>{
    axios.get(`${server}/task/getTasks`,{
      withCredentials:true,
    }).then((response)=>{
      let Task = response.data.tasks;
      Task = Task.filter((i)=>(i._id == id));
      setInputTitle(Task.title);
      setInputDesc(Task.description);
    }).catch(e=>{
      toast.error(e.response.data.message)
    })
  },[refresh])


  return (
    <div>
      <div>
      <input onChange={()=>{ToggleHandler(id)}} type="checkbox" checked={isCompleted}  />

        <input type="text" readOnly={isCompleted} onChange={(e)=>setInputTitle(e.target.value)} value={inputTitle}/>
        <input type="text" readOnly={isCompleted} onChange={(e)=>setInputDesc(e.target.value)} value={inputDesc}/>
      </div>
      <div>
        <button onClick={()=>{updateHandler(id)}} disabled={isCompleted}>update</button>
        <button onClick={()=>{deleteHandler(id)}}>Delete</button>
      </div>
    </div>
  )
}

export default TodoItems
