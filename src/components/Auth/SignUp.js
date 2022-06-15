import axios from "axios";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const SignUp = () => {
  const [formValue, setformValue] = React.useState({
    name: "",
    lastname: "",
    username: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();


  const handleSubmit2 = (event) => {
    
    event.preventDefault();
    var { name, lname, uname, pass } = document.forms[0];
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    var { name, lname, uname, pass } = document.forms[0];
    const loginFormData = new FormData();
    loginFormData.append("name", formValue.name);
    loginFormData.append("lastname", formValue.lastname);
    loginFormData.append("username", formValue.username);
    loginFormData.append("password", formValue.password);
    var result = false;
    try {
      await axios.post("http:localhost:8080/users", {
        name: name.value,
        last_name: lname.value,
        username: uname.value,
        user_pass: pass.value,
      });
    } catch (error) {
      console.log(error);
    }
      await axios.get("http://localhost:8080/users").then((res) => {
        setUsers(res.data);
        res.data.map(user => {
          if (user.username === uname.value && user.user_pass === pass.value) {
            result = true;
            localStorage.setItem("name", name.value);
            localStorage.setItem("username", uname.value);
            localStorage.setItem("id", user.id);
            navigate("/users");
          }
        })
        users.map(user => {
          if (user.username === uname.value && user.user_pass === pass.value) {
            result = true;
            localStorage.setItem("name", name.value);
            localStorage.setItem("username", uname.value);
            localStorage.setItem("id", user.id);
            navigate("/users");
          }
        })
      }).catch(err => console.log(err));


    if (!result) {
      alert("Either username or password does not exist in db");
    }
  };

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  const renderErrorMessage = (name) =>
  name === errorMessages.name && (
    <div className="error">{errorMessages.message}</div>
  );

const renderForm = (
  <div className="form">
    <form onSubmit={handleSubmit}>
    <div className="input-container">
        <label>Name </label>
        <input type="text" name="name" required />
        {renderErrorMessage("name")}
      </div>
      <div className="input-container">
        <label>Last Name </label>
        <input type="text" name="lname" required />
        {renderErrorMessage("uname")}
      </div>
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
        <input type="submit" value="Sign In"  onClick={() => {navigate("/signin")}} type="submit" />
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
};

export default SignUp;
