import React from "react";
import "../styles/PostView.css";

function PostView({ username, image, description }) {
  return (
    <div className="postView">
      <p>{username}</p>
      <img
        className="post_image_home"
        src={`http://localhost:3001/images/${image}`}
      />
      <p>{description}</p>
    </div>
  );
}

export default PostView;
