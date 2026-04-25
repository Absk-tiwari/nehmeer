import axios from "axios"; 
import Themeroutes from "./routes/Router.js";
import ShowError from './components/errors/ShowError'
import './App.css';
import './assets/scss/app.scss'
import 'bootstrap/dist/js/bootstrap.min.js';

import { useDispatch, useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import { useEffect } from "react";
import { getProfile } from "./redux/slices/authSlice.js";

// ✅ FIXED TOKEN
const token = localStorage.getItem('token');

let headers = { 'Content-Type': 'application/json' };

if (token) {
  headers['Authorization'] = `Bearer ${token}`; // ✅ FIXED
}

axios.defaults.baseURL =
  process.env.REACT_APP_BACKEND_URI ?? 'http://localhost:5000';

axios.defaults.headers.common = headers;

function App() {

  const dispatch = useDispatch();
  const { error, errorCode } = useSelector((state) => state.auth);
  const routing = useRoutes(Themeroutes);



  useEffect(() => {
  const token = localStorage.getItem("token");
  console.log("TOKEN:", token);

  if (token) {
    dispatch(getProfile());
  }
}, [dispatch]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     dispatch(getProfile());
  //   }
  // }, [dispatch]);

  

  if (error) {
    if (errorCode === 500) {
      return <ShowError error={error} />;
    }
  }

  return routing;
}

export default App;