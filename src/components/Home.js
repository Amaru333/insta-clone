import React, { useState, useEffect } from "react";
import axios from "axios";
import PostView from "./PostView";

import "../styles/Home.css";

function Home() {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setPostData(response.data);
    });
  }, []);

  console.log(postData);

  return (
    <div className="home_page">
      <div className="post_cards">
        {postData.map((post, i) => (
          <PostView
            key={i}
            username={post.username}
            image={post.image}
            description={post.postText}
            id={post.id}
            userid={post.UserId}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
