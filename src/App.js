import axios from "axios"; 
import Themeroutes from "./routes/Router.js";
import ShowError from './components/errors/ShowError'
import './App.css';
import './assets/scss/app.scss'
import 'bootstrap/dist/js/bootstrap.min.js';

import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";

const token = localStorage.getItem('nehmeer-auth-token');
let headers = { 'Content-Type' : 'application/json' }

if(token) {
    headers['nehmeer-token'] = token;
}
    
axios.defaults.baseURL=process.env.REACT_APP_BACKEND_URI??'http://localhost:5000';
axios.defaults.headers.common = headers;

function App() {

    const { error, errorCode } = useSelector((state) => state.auth);
    const routing = useRoutes(Themeroutes);

    if(error) {
        if(errorCode===500) {
            return <ShowError error={error}/>
        }
    }
    return routing;
  
}

export default App;
