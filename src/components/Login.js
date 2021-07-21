import React, { useState, useContext } from "react";
import LoginBG from "../images/Login_bg.png";
import LoginLogo from "../images/Login_Logo.png";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import TextField from "@material-ui/core/TextField";

import "../styles/LoginPage.css";

import clsx from "clsx";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

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

const useTextStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function Login() {
  const classes = useStyles();
  const classesText = useTextStyles();
  const [value, setValue] = React.useState("Controlled");
  const [userID, setUserID] = useState();
  const [password, setPassword] = useState();
  const [usernameError, setUsernameError] = useState();
  const [passwordError, setPasswordError] = useState();
  const { authState, setAuthState } = useContext(AuthContext);

  if (authState.status) {
    window.location.href = "/";
  }

  const handleUsername = (event) => {
    setUserID(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const login = () => {
    setUsernameError(null);
    setPasswordError(null);
    axios
      .post("http://localhost:3001/auth/login", {
        username: userID,
        password: password,
      })
      .then((response) => {
        if (response.data.status === 1) {
          setUsernameError("User does not exist");
        } else if (response.data.status === 2) {
          setPasswordError("Wrong username/password combination");
        } else if (response.data.status === 3) {
          console.log("Logged in successfully", response.data);
          localStorage.setItem("accessToken", response.data.accessToken);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  };

  return (
    <div className="login_page">
      <div style={{ paddingRight: "1vw" }}>
        <img src={LoginBG} alt="Login Background" />
      </div>
      <div>
        <div style={{ width: "20vw" }}>
          <Card
            className={classes.root}
            variant="outlined"
            style={{ backgroundColor: "white" }}
          >
            <CardContent>
              <img
                src={LoginLogo}
                alt="Login Background"
                style={{ margin: "20px 0px 20px 0px" }}
              />
              <Typography variant="h5" component="h2">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    error={usernameError}
                    id="outlined-textarea"
                    label="Username"
                    variant="outlined"
                    onChange={handleUsername}
                    style={{ marginBottom: "10px" }}
                    helperText={usernameError ? `${usernameError}` : ""}
                  />

                  {/* <TextField
                    id="outlined-password-input"
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={handlePassword}
                  /> */}
                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                  >
                    <InputLabel
                      error={passwordError}
                      htmlFor="outlined-adornment-password"
                    >
                      Password
                    </InputLabel>
                    <OutlinedInput
                      error={passwordError}
                      id="outlined-adornment-password"
                      type={values.showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePassword}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={70}
                    />
                  </FormControl>
                </div>
                {passwordError && (
                  <p
                    style={{
                      fontSize: "12px",
                      padding: "5px 0px 0px 10px",
                      margin: "0px",
                      textAlign: "left",
                      color: "#f44336",
                    }}
                  >
                    Incorrect Password
                  </p>
                )}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                onClick={login}
                style={{
                  backgroundColor: "#0095f6",
                  color: "white",
                  width: "100%",
                  margin: "0px 10px 0px 10px",
                  textTransform: "none",
                }}
              >
                Log In
              </Button>
            </CardActions>
            <p style={{ fontSize: "14px" }}>Forgot Password?</p>
          </Card>
          <br />
          <Card
            className={classes.root}
            variant="outlined"
            style={{ backgroundColor: "white" }}
          >
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                <p style={{ padding: "8px 0px 0px 0px", margin: "0" }}>
                  Don't have an account?{" "}
                  <a
                    href="/accounts/emailsignup"
                    style={{
                      textDecoration: "none",
                      color: "#0095f6",
                      fontWeight: "500",
                    }}
                  >
                    Sign up
                  </a>
                </p>
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;
