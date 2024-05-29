import React ,{useContext, createContext, useState}from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


export const TodoContext = createContext({});

const WrapApp = ()=>{

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  return(
    <TodoContext.Provider value={{isAuthenticated, setIsAuthenticated, loading, setLoading, user, setUser}}>
    <App/>
  </TodoContext.Provider>
  )
  
}


export const server = "http://localhost:4500/api/v1";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WrapApp/>
  </React.StrictMode>,
)
