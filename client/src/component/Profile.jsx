import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../main';

function Profile() {

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const {user,isAuthenticated,   } = useContext(TodoContext);


  useEffect(()=>{
    if(isAuthenticated){
      setUserName(user?.name);
      setUserEmail(user?.email);
    }
    else{
      setUserName("");
    setUserEmail("");
    }
  },[isAuthenticated, user?.name, user?.email])

  return (
    <div className='flex flex-col justify-center items-center mt-40 gap-20'>
      {
        isAuthenticated ? (<><h1 className='text-3xl font-bold text-gray-600'>UserName :- {userName}</h1>
          <p className='text-3xl font-bold text-gray-600'>Email :- {userEmail}</p></>)
           : (<p className='text-3xl font-bold text-gray-600'>Login first</p>
           )
      }
      
    </div>
  )
}

export default Profile
