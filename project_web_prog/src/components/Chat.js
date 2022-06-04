import React  from 'react';

import s from './Header.module.css'

import { BrowserRouter as Router,Switch,Route,NavLink} from "react-router-dom";

const Header =(props)=>{

   
    return (
      <nav >
        <NavLink to="/home"
          className={"navbar-brand col-sm-3 col-md-2 mr-0 "+s.all}
         
        >
          
          
        </NavLink>
       
      </nav>
    );
  
}

export default Header;