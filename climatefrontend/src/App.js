import React, { useEffect, useState } from "react";
import styled from "styled-components";

function App() {
  const [prediction, setPrediction] = useState(null);

  //App Lifecycle
  useEffect(() => {
    console.log("App mounted");
    return () => {
      console.log("App unmounted");
    };
  }, []);

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
  };

  return (
    <>
      <Home>
        <h1>Climate Change Predictor</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="temperature-input">Temperature (Celsius)</label>
          <input id="temperature-input" type="number" />
          <button type="submit">Predict</button>
        </form>
        {prediction && <h2>{prediction}</h2>}
      </Home>
    </>
  );
}

export default App;

const Home = styled.div`
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
