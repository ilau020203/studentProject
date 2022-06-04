import './App.css';
import Header from "./components/Header";
import Friends from "./pages/Friends";
import Navbar from "./components/Navbar";
import Messenger from "./pages/Messenger";
import News from "./pages/News";
import {SignUp} from "./pages/SignUp";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

export const useRoutes = (isAuthenticated) => 
{
    if (isAuthenticated)
    {
        return (
            <>
                
                <main>
                    <Routes>
                        <Route exact path = "/" element={<Navigate  to="/news" />} />  
                        <Route exact path = "/signUp" element={<Navigate  to="/news" />} />

                        <Route path = "/friends/" element = 
                            {
                                <Friends>   </Friends>
                            }>
                        </Route>

                        <Route path="/messenger/" element = 
                            {
                                <Messenger> </Messenger>
                            }>
                        </Route>

                        <Route path = "/news" element = 
                            {
                                <News>  </News>
                            }>
                        </Route>

                    </Routes>
                </main>
            </>
        )
    }
    return (
        <Routes>
            <Route path = "*" element = {<Navigate to = "/signUp"/>} /> 
            <Route path = "/signUp" element =
                {
                    <SignUp >  </SignUp>
                }>
            </Route>
        </Routes>
    )
  }