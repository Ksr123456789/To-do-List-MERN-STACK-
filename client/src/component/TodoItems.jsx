import React, { useEffect, useState } from 'react'
import {server} from '../main'
import axios from 'axios';
import toast from 'react-hot-toast';

const TodoItems = ({title, description, isCompleted, ToggleHandler, deleteHandler, id}) => {

  const[inputTitle, setInputTitle] = useState(title);
  const[inputDesc, setInputDesc] = useState(description);
  const [refresh, setRefresh] = useState(false);
  const[iseditable, setIseditable] = useState(false);
  

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

  console.log(isCompleted)

  return (
    <div className='flex  justify-evenly items-center'>
     
     
        
        <div className="form-control">
          <label className="cursor-pointer label">
             <input onChange={()=>{ToggleHandler(id)}} type="checkbox" checked={isCompleted} className="checkbox checkbox-error" />
          </label>
        </div>

       <div className=' gap-2   my-2 flex flex-col'>
         <input  type="text" readOnly={!iseditable || isCompleted} onChange={(e)=>setInputTitle(e.target.value)} value={inputTitle}className={`${!iseditable || isCompleted ? `focus:outline-none`:""} bg-blue-100 font-bold text-2xl input input-ghost w-full max-w-xs ${isCompleted ? `line-through`:""}`} />

         <textarea className={` text-xl ${isCompleted ? `line-through`:""} ${!iseditable || isCompleted ? `focus:outline-none`:""} textarea bg-blue-100`}
         readOnly={!iseditable || isCompleted} onChange={(e)=>setInputDesc(e.target.value)} value={inputDesc} placeholder="Bio"></textarea>

         <input type="text" className={` input input-ghost w-full max-w-xs `} />
       </div>
       

      <div className='flex gap-2'>
      <button
        disabled={isCompleted}
        onClick={()=>{
          if(iseditable){
            setIseditable(false);
            updateHandler(id);
          }
          else setIseditable(prev => !prev)

        }}
        className="btn btn-active"
      >
        {iseditable ? `save`:`edit`}
      </button>



      <button onClick={()=>{deleteHandler(id)}} className="btn btn-active">Delete</button>

        
      </div>
    </div>
  )
}

export default TodoItems
