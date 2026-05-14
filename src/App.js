import axios from "axios";
import Themeroutes from "./routes/Router.js";
import ShowError from './components/errors/ShowError'
import './App.css';
import './assets/scss/app.scss'
import 'bootstrap/dist/js/bootstrap.min.js';

import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

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
  const { error, errorCode } = useSelector((state) => state.auth);
  const routing = useRoutes(Themeroutes);

  if (error) {
    if (errorCode === 500) {
      return <ShowError error={error} />;
    }
  }

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            style: {
              background: '#22c55e',
            },
          },
          error: {
            style: {
              background: '#ef4444',
            },
          },
        }}
      />
      {routing}
    </>
  );
}

export default App;