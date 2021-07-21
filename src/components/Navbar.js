import React, { useState, useContext } from "react";
import LoginLogo from "../images/Login_Logo.png";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

import "../styles/Navbar.css";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";

import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import HomeIcon from "@material-ui/icons/Home";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Navbar() {
  const classes = useStyles();

  return (
    <div className="navbar">
      <Card
        className={classes.root}
        variant="outlined"
        style={{
          backgroundColor: "white",
        }}
      >
        <div className="navbar_inner">
          <div className="navbar_inner_components">
            <a href="/">
              <img
                src={LoginLogo}
                alt="instagram"
                style={{ width: "125px", padding: "10px" }}
              />
            </a>
          </div>
          <div className="navbar_inner_components">
            <TextField
              className="search_bar"
              placeholder="Search"
              variant="outlined"
              inputProps={{
                style: {
                  padding: "8px",
                  backgroundColor: "#fafafa",
                },
              }}
            />
          </div>
          <div className="navbar_inner_components">
            <div className="navbar_icons">
              <div className="navbar_icon">
                <a href="/">
                  {window.location.href === "/" ? (
                    <HomeOutlinedIcon className="navbar_icon_home" />
                  ) : (
                    <HomeOutlinedIcon className="navbar_icon_home" />
                  )}
                </a>
              </div>
              <div className="navbar_icon">
                <MessageOutlinedIcon />
              </div>
              <div className="navbar_icon">
                <FavoriteBorderOutlinedIcon />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Navbar;
