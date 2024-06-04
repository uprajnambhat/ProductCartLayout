import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import "../stylesheets/loginPage.css";
import Button from "react-bootstrap/Button";
import ProductDetails from "./ProductDetails";

const LoginPage = () => {
  const [inputName, setInputName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setInputName(event.target.value);
  };
  console.log(handleNameChange);
  const handlePasswordChange = (event) => {
    setInputPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("inputName", inputName);
    console.log("inputPassword", inputPassword);
  };

  const onSubmitClick = () => {
    navigate("/Products");
  };

  return (
    <div className="LoginStyle">
      <Container>
        <h4>WELCOME to Products Page!</h4>
        <p>Enter your details below</p>
        <form onSubmit={handleSubmit} className="FormStyle">
          <input
            type="text"
            value={inputName}
            onChange={handleNameChange}
            placeholder="Enter Name"
          />
          <br></br>
          <input
            type="text"
            value={inputPassword}
            onChange={handlePasswordChange}
            placeholder="Enter Password"
          />
          <br></br>
          <Button
            variant="outline-success"
            onClick={() => {
              onSubmitClick(inputName);
            }}
          >
            SUBMIT
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default LoginPage;
