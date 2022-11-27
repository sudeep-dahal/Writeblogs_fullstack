import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import Individualpost from "./pages/Individualpost";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import{useState,useEffect} from 'react'
import axios from "axios";

function App() {

  const [authState,setauthState]=useState({
    username:"username",
    id:0,
    status:false,
  })

  useEffect(()=>{
    axios.get('http://localhost:5000/auth/verify',{
      headers:{
        accessToken:localStorage.getItem('accessToken')
      }
    }).then((response)=>{
      if(response.data.error){
          setauthState({...authState,status:false})
      }

      else{
    setauthState({
      username:response.data.username,
      id:response.data.id,
      status:true,
    
    })

      }
    })

    
  },[authState])

  const logout = ()=>{
    localStorage.removeItem("accessToken")
    setauthState({ username:"",
      id:0,
      status:false,})
  }
  
  
  return (
    <div className="App">
     <AuthContext.Provider value={{authState,setauthState}}>
      <Router>
        <div className="flex flex-row justify-between h-14 bg-[#82ac7c] mt-0">
       
        <div className="flex justify-between items-center">
        <ul className="flex flex-row gap-2 position mt-0">
          <li>
            <Link
              to="/newpost"
              className="flex justify-center hover:bg-[#B6CEB4] flex-wrap rounded-md p-4   items-center"
            >
              Create a Post
            </Link>
          </li>

          <li>
            <Link
              to="/"
              className="flex justify-center flex-wrap hover:bg-[#B6CEB4] rounded-md p-4 items-center"
            >
              Home Page
            </Link>
          </li>
        
        </ul>
        </div>

        {!authState.status  ?(

        <div className="mr-10 flex justify-between items-center">
        <ul className="flex flex-row gap-2 position mt-0">
          <li>
            <Link
              to="/register"
              className="flex justify-center hover:bg-[#B6CEB4] flex-wrap rounded p-4   items-center"
            >
              Register
            </Link>
          </li>

          <li>
            <Link
              to="/login"
              className="flex justify-center flex-wrap hover:bg-[#B6CEB4] rounded p-4 items-center"
            >
              Login
            </Link>
          </li>
        
        </ul>
        </div>
        ):(
          <button onClick={logout}className="flex justify-center hover:bg-[#B6CEB4] flex-wrap rounded p-4   items-center">Logout</button>
        )}

        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newpost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Individualpost />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" exact element={<Registration/>} />
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
