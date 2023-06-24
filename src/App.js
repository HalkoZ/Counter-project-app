import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";
import { store } from "./store/store";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import jwtDecode from "jwt-decode";
import { authSlice } from "./store/authSlice";
import Counter from "./pages/Counter/Counter";

const NavigationRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded = jwtDecode(token);
      dispatch(authSlice.actions.setData(decoded));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationRoutes />
    </Provider>
  );
};

export default App;
