import React,{useState,useContext} from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../helpers/AuthContext';

function Login() {

  let navigate=useNavigate()
  const [username,setusername]= useState("")
  const [password,setpassword]= useState("")
  const {setauthState}= useContext(AuthContext)

  const login =() => {
    const data={username:username,password:password}
    axios.post("http://localhost:5000/auth/login",data).then((response)=>{
      if(response.data.error)
      { alert(response.data.error);} else{
     localStorage.setItem("accessToken",response.data )
     setauthState({ username:"",
      id:0,
      status:true,})
      navigate("/");
      }
    })
  } 

  return(
   <>
  <div className='flex items-center justify-center'>
    
    <div className="flex  flex-col max-w-sm m-36 bg-white  rounded-lg border w-[400px] h-[300px] border-gray-200 shadow-md hover:bg-gray-100 relative  ">
              
    <div className='flex items-center rounded-t-lg bg-[#98ba94] p-3 justify-center mb-5 bold'>Login</div>
    
    <label>Username: </label>
    <input className="pl-1" type="text" onChange={(event)=>{
      setusername(event.target.value)
    }}/>

    <label>Password: </label>
    <input className="pl-1" type="password" onChange={(event)=>{
      setpassword(event.target.value)
    }}/>

 
  <button
   onClick={login}
    className="bg-black ml-5 bottom-0 absolute mb-2 hover:bg-green-900 flex justify-center items-center rounded p-2 text-white"
 
  >
Login
  </button>
</div>
</div>

</>

  )
}

export default Login