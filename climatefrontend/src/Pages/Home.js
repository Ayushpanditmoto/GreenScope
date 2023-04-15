import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import app from "../firebase";
import { useNavigate } from "react-router-dom";

function Home() {
  const [prediction, setPrediction] = useState(null);
  const navigate = useNavigate();

  const [data, setdata] = useState(null);

  //Home Lifecycle
  useEffect(() => {
    console.log("Home mounted");
    return () => {
      console.log("Home unmounted");
    };
  }, []);

  const fetchApi = async () => {
    //post request
    const response = await fetch("http://127.0.0.1:5000/predict_temperature", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ year: data }),
    });
    const data = await response.json();
    console.log(data);
    setdata(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const temperature = event.target.elements["temperature-input"].value;
    if (!temperature) {
      alert("Please enter a temperature");
      return;
    }
    if (isNaN(temperature)) {
      alert("Please enter a valid number");
      return;
    }
    const prediction = temperature > 0 ? "Warming" : "Cooling";
    setPrediction(prediction);
    fetchApi();
  };
  const auth = getAuth(app);

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <>
      <HomeS>
        <HeadS>
          <h3>
            {auth.currentUser ? auth.currentUser.email : "demo@gmail.com"}
          </h3>
          <button onClick={handleLogout}>Logout</button>
        </HeadS>
        <h1>Climate Change Predictor</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="temperature-input">Temperature (Celsius)</label>
          <input
            value={data}
            onChange={(e) => {
              setdata(e.target.value);
            }}
            name="temperature"
            id="temperature"
            type="number"
          />
          <button type="submit">Predict</button>
        </form>
        {prediction && <h2>{prediction}</h2>}
      </HomeS>
    </>
  );
}

export default Home;

const HeadS = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  width: 600px;
`;

const HomeS = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("climate.png");
  height: 100vh;
  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #0051dc;
    /* text shadow */
    text-shadow: 1px 1px 0 #fff, 2px 2px 0 #777;
  }
  h3 {
    color: #ff0000;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    label {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: #fff;
    }
    input {
      width: 20rem;
      height: 2rem;
      font-size: 1.5rem;
      margin-bottom: 1rem;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      padding: 0.5rem;
      outline: none;
    }
  }
  h2 {
    font-size: 2rem;
    margin-top: 2rem;
    color: #0051dc;
  }
`;
