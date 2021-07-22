import React from "react";

function PostView({ username, image, description }) {
  return (
    <div>
      <p>{username}</p>
      <img src={`http://localhost:3001/images/${image}`} />
      <p>{description}</p>
    </div>
  );
}

export default PostView;
