import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listposts, setlistposts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/posts").then((response) => {
      setlistposts(response.data);
    });
  }, []);

  let navigate = useNavigate();

  return (
    <div className=" grid grid-cols-2 place-items-center ">
      {listposts.map((value, index) => {
        return (
          <div
          key={index}
            className="flex flex-col max-w-sm m-3 bg-white cursor-pointer  rounded-lg  border w-[500px] h-[400px] border-gray-200 shadow-2xl hover:bg-gray-100 relative dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700w-[400px]  mt-50px box "
            onClick={() => {
              navigate(`/post/${value.id}`);
            }}
          >
            <div className="flex p-2 rounded-t-lg bg-[#9dba94] justify-center items-center uppercase">
              {value.title}
            </div>
            <div className="p-2 "> {value.postText}</div>
            <div className=" bg-[#98ba94]  rounded-b-lg w-full bottom-0 absolute right-0 p-2">
              
              {value.username}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
