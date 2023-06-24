import React, { useState } from "react";
import "./Counter.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { countSlice } from "../../store/countSlice";
import { authSlice } from "../../store/authSlice";

const Counter = (props) => {
  const [counter, setCounter] = useState(0);
  const counterState = useSelector((state) => state.count);
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const incraseCounter = () => {
    dispatch(countSlice.actions.setIncrase());
  };
  const restartCounter = () => {
    dispatch(countSlice.actions.removeCount());
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="count-number">{counterState.counting}</h1>
        <div className="buttons-wrapper">
          <div
            className="count-button"
            onClick={() => {
              incraseCounter();
            }}
          ></div>
          <div
            className="reset-button"
            onClick={() => {
              restartCounter();
            }}
          ></div>
        </div>

        {authState.id ? <button>Save</button> : <button>Login</button>}
      </header>
    </div>
  );
};

export default Counter;
