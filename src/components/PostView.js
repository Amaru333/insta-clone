import React from "react";
import "../styles/PostView.css";

function PostView({ username, image, description }) {
  return (
    <div className="postView">
      <p className="post_username">{username}</p>
      <img
        className="post_image_home"
        src={`http://localhost:3001/images/${image}`}
      />
      <p className="post_contents">
        <span className="post_username" style={{ padding: "0px" }}>
          {username}
        </span>
        <span className="post_description">{description}</span>
      </p>
    </div>
  );
}

export default PostView;
