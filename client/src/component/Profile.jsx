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
    <div>
      <h1>{userName}</h1>
      <p>{userEmail}</p>
    </div>
  )
}

export default Profile
