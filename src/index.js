import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./components/store/auth-context";
import './index.css';
import App from './App';
import React from "react";

ReactDOM.render(
    <AuthContext.Provider>
        <BrowserRouter><App /></BrowserRouter>, document.getElementById('root')
    </AuthContext.Provider>
);
