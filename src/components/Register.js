import React, { useState, useContext } from "react";
import LoginLogo from "../images/Login_Logo.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import TextField from "@material-ui/core/TextField";

import "../styles/RegisterPage.css";

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

function Register() {
  const { authState, setAuthState } = useContext(AuthContext);

  if (authState.status) {
    window.location.href = "/";
  }

  let history = useHistory();

  const classes = useStyles();
  const classesText = useTextStyles();

  const [email, setEmail] = useState();
  const [fullName, setFullName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [emailError, setEmailError] = useState();
  const [usernameError, setUsernameError] = useState();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleFullName = (event) => {
    setFullName(event.target.value);
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  //
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = () => {
    setEmailError(null);
    setUsernameError(null);
    axios
      .post("http://localhost:3001/auth/", {
        email: email,
        fullName: fullName,
        username: username,
        password: password,
      })
      .then((response) => {
        //error:1 => email error
        //error:2 => username error
        console.log(response, email, fullName, username, password);
        if (response.data.status === 1) {
          setEmailError("Email already in use");
        }
        if (response.data.status === 2) {
          setUsernameError("Username already in use");
        }
        if (response.data.status === 3) {
          setEmailError(null);
          setUsernameError(null);
          history.push("/accounts/login");
        }
      });
  };

  return (
    <div className="register_page">
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
                    error={emailError}
                    id="outlined-textarea"
                    label="Email ID"
                    variant="outlined"
                    onChange={handleEmail}
                    style={{ marginBottom: "10px" }}
                    helperText={emailError ? `${emailError}` : ""}
                  />
                  <TextField
                    id="outlined-textarea"
                    label="Full Name"
                    variant="outlined"
                    style={{ marginBottom: "10px" }}
                    onChange={handleFullName}
                  />
                  <TextField
                    error={usernameError}
                    id="outlined-textarea"
                    label="Username"
                    variant="outlined"
                    style={{ marginBottom: "10px" }}
                    onChange={handleUsername}
                    helperText={usernameError ? `${usernameError}` : ""}
                  />
                  {/* <TextField
                    id="outlined-password-input"
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={handlePassword}
                  /> */}
                  {/*--------------------------------------------------------------------------------------------------------------------------*/}
                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
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
                  {/*--------------------------------------------------------------------------------------------------------------------------*/}
                </div>
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                onClick={onSubmit}
                style={{
                  backgroundColor: "#0095f6",
                  color: "white",
                  width: "100%",
                  margin: "0px 10px 0px 10px",
                  textTransform: "none",
                }}
              >
                Sign up
              </Button>
            </CardActions>
            <p style={{ fontSize: "14px", color: "#8e8e8e" }}>
              By signing up, you agree to our{" "}
              <strong style={{ fontWeight: "500" }}>Terms</strong>,{" "}
              <strong style={{ fontWeight: "500" }}>Data Policy</strong> and{" "}
              <strong style={{ fontWeight: "500" }}>Cookies Policy</strong>.
            </p>
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
                  Have an account?{" "}
                  <a
                    href="/accounts/login"
                    style={{
                      textDecoration: "none",
                      color: "#0095f6",
                      fontWeight: "500",
                    }}
                  >
                    Log in
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

export default Register;
