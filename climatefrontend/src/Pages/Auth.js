import React, { useState } from "react";
import styled from "styled-components";
import app from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Auth() {
  const [isSignup, setSignUp] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (event) => {
    console.log(formData);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const auth = getAuth(app);
    try {
      if (isSignup) {
        //signup
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log(user);

        alert("User created successfully");

        if (user) {
          navigate("/");
        }
      } else {
        //signin
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log(user);

        alert("User signed in successfully");

        if (user) {
          navigate("/");
        }
      }
    } catch (error) {
      const errorMessage = error.message;
      alert(errorMessage);
    }
  };

  return (
    <>
      <AuthS>
        <form>
          <h1>{isSignup ? "Sign Up" : "Sign In"}</h1>
          <label htmlFor="email-input">Email</label>
          <input
            name="email"
            value={email}
            onChange={handleChange}
            id="email"
            placeholder="Enter Your Email"
            type="email"
          />
          <label htmlFor="password-input">Password</label>
          <input
            name="password"
            value={password}
            onChange={handleChange}
            id="password"
            placeholder="Enter Your Password"
            type="password"
          />
          <button onClick={handleSubmit} type="submit">
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
          <p>
            {isSignup && "Already have an account?"}
            {!isSignup && "Don't have an account?"}
          </p>
          <p
            className="switch"
            onClick={() => {
              console.log("clicked");
              setSignUp(!isSignup);
            }}
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </p>
        </form>
        {/* Already have a account */}
      </AuthS>
    </>
  );
}

export default Auth;

const AuthS = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("climate.png");
  height: 100vh;
  .switch {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: #fcfcfc;
    justify-content: center;
    label {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    input {
      min-width: 20rem;
      height: 2rem;
      font-size: 1.5rem;
      margin-bottom: 1rem;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      padding: 0.5rem;
      outline: none;
    }
  }
`;
