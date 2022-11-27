import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Individualpost() {
  let { id } = useParams();

  const [postobject, setpostobject] = useState({});
  const [comments, setcomments] = useState([]);
  const [commentbody, setcommentbody] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/byId/${id}`).then((response) => {
      setpostobject(response.data);
    });

    axios.get(`http://localhost:5000/comments/${id}`).then((response) => {
      setcomments(response.data);
    });
  }, [id]);

  const addcomment = () => {
    axios
      .post("http://localhost:5000/comments", {
        commentBody: commentbody,
        PostId: id,
      },{
        headers:{
          accessToken: localStorage.getItem("accessToken")
        }
      })
      .then((response) => {
        if(response.data.error){
          alert("User not logged in")
        }else{
        const commenttoadd = { commentBody: commentbody, username:response.data.username };
        setcomments([...comments, commenttoadd]);
        setcommentbody("");
  }});
  };
  return (
    <>
      <div className="flex justify-evenly items-centerflex-row  m-7 ">
        <div className=" max-w-sm m-3 bg-white cursor-pointer rounded-lg border w-[1000px] h-[500px] border-gray-200 shadow-md hover:bg-gray-100 relative dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700w-[400px] flex flex-col mt-50px box ">
          <div className="flex uppercase p-2 rounded-t-md bg-[#98ba94] justify-center items-center">
            {postobject.title}
          </div>
          <div className="p-2 "> {postobject.postText}</div>
          <div className="bg-[#98ba94] rounded-b-md  w-full bottom-0 absolute right-0 p-2">
            {postobject.username}
          </div>
        </div>

        <div className="max-w-sm m-3 scroll-smooth overflow-auto bg-white   rounded-lg border w-[1000px] h-[500px] border-gray-200 shadow-md hover:bg-gray-100  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700w-[400px] flex flex-col mt-50px box ">
          <div>
          <h1 className="flex p-2 rounded uppercase bg-fixed bg-[#98ba94] justify-center items-center">
            Comments
          </h1>
          </div>
          <div className="flex flex-col rounded-md justify-center items-center">
            <input
              value={commentbody}
              className="h-10 rounded-md w-[380px] mt-2 p-1"
              type="text"
              placeholder="Comment...."
              autoComplete="off"
              onChange={(event) => {
                setcommentbody(event.target.value);
              }}
            />
            <button
              onClick={addcomment}
              className="bg-[#98ba94] w-32 rounded mt-4 hover:bg-[#B6CEB4] cursor-pointer hover: p-2"
            >
              Add Comment
            </button>
          </div>

          <div className=" bordershadow-lg p-2  rounded  flex flex-col ">
            {comments.map((value, index) => {
              return (
                <div
                  className="border relative shadow-md  bg-[#98ba94] pl-2 p-5 rounded-lg mt-5"
                  key={index}
                >
                  {value.commentBody}
                  <label className="flex justify-end text-sm text-gray-500 bottom-0 right-1 absolute items-end"><span className="text-sm">@</span>{value.username}</label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Individualpost;
