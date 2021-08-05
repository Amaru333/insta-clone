import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/PostView.css";

function PostView({ username, image, description, userid }) {
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/auth/details/${userid}`)
      .then((response) => {
        console.log(response.data.profile_image);
        setUserImage(response.data.profile_image);
      });
  }, [userid]);

  return (
    <div className="postView">
      <div style={{ display: "flex", alignItems: "center" }}>
        <a href={`/${username}`}>
          <img src={userImage} className="profile_image" />
        </a>
        <p className="post_username">
          <a
            style={{ textDecoration: "none", color: "black" }}
            href={`/${username}`}
          >
            {username}
          </a>
        </p>
      </div>

      <div className="post_image_home_container">
        <img
          className="post_image_home"
          src={`http://localhost:3001/images/${image}`}
        />
      </div>
      <p className="post_contents">
        <span className="post_username" style={{ padding: "0px" }}>
          <a
            style={{ textDecoration: "none", color: "black" }}
            href={`/${username}`}
          >
            {username}
          </a>
        </span>
        <span className="post_description">{description}</span>
      </p>
    </div>
  );
}

export default PostView;
