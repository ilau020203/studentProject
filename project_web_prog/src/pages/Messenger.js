import React  from 'react';
import LocalizedStrings from 'react-localization';

import s from './Header.module.css'


import {useContext}  from 'react';
import {AuthContext} from "../context/AuthContext"
import { BrowserRouter as Router,Switch,Route,NavLink} from "react-router-dom";

const Header=(props)=>{
  const auth = useContext(AuthContext)
    let strings = new LocalizedStrings({

      en:{
          empty_chat:"Oops, you haven't texted anyone yet",
          non_empty_chat:"Your chats:"
      },
      ru: {
        empty_chat:"Похоже, вы еще никому не писали",
        non_empty_chat:"Ваши чаты:"
      }
    });

  strings.setLanguage(auth.language)
  
  return (
    <div className={s.ribbon}>
    <h4>{strings.empty_chat}</h4>
    </div>
  );

}

export default Header;