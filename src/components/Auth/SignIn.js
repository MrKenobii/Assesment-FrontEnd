import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from 'react-router-dom';

import "./styles.css";

const SignIn = () => {

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  
 

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };
  
 
  useEffect(() => {
    getUsers();
    }, []);
  const getUsers = async () => {
      const response = await axios.get('http:localhost:8080/users');
      setUsers(response.data);
  }

  const handleSubmit = (event) => {
    
    event.preventDefault();
    var { uname, pass } = document.forms[0];
    var response = false
    users.map((user) => {
        if(user.username === uname.value && user.user_pass === pass.value){
            response = true;
            localStorage.setItem("username", uname.value);
            localStorage.setItem("name", user.name);
            localStorage.setItem("id", user.id);
            navigate("/users");
        }
    });
    if(!response) {
        alert("Either username or password does not exist in db");
    }
  };

  
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
      <div className="button-container">
          <input type="submit" value="Sign Up"  onClick={() => {navigate("/signup")}} type="submit" />
      </div>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}

      </div>
    </div>
  );
}

export default SignIn;