import React, { useState, useEffect } from "react";
import axios from "axios";
import PostView from "./PostView";

function Home() {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setPostData(response.data);
    });
  }, []);

  console.log(postData);

  return (
    <div>
      <p>Welcome to homepage</p>
      {postData.map((post) => (
        <PostView
          username={post.username}
          image={post.image}
          description={post.postText}
          id={post.id}
          userid={post.UserId}
        />
      ))}
    </div>
  );
}

export default Home;
