import './App.css';
import "materialize-css"

import Navbar from "./components/Navbar";
import Header from "./components/Header";

import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import { useState } from "react";


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from './context/AuthContext';



function App() 
{

  const { token, login, logout, id ,refreshToken,language,setLanguage} = useAuth()
  console.log(token)
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  console.log(isAuthenticated)
  return (
    <AuthContext.Provider value = 
      {{
        token,refreshToken, login, logout, isAuthenticated,id,language,setLanguage
      }}>
      <Router>
        { isAuthenticated && <Header /> }
        { isAuthenticated && <Navbar /> }
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
