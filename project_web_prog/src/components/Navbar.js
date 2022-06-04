import React  from 'react';
import LocalizedStrings from 'react-localization';
import {useEffect,useState,useContext}  from 'react';
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from "../context/AuthContext"
import s from './Navbar.module.css'

import { NavLink} from "react-router-dom";

const Navbar =(props)=>{
    const auth = useContext(AuthContext)

    let strings = new LocalizedStrings({

        en:{
            my_page:"My page",
            friends:"Friends",
            messenger:"Messenger",
            news:"News",
        },
        ru: {
            my_page:"Моя страница",
            friends:"Друзья",
            messenger:"Сообщения",
            news:"Новости",
        }
       });

    strings.setLanguage(auth.language)

    return (
        <nav className={s.container}>
            <NavLink to="/mypage"
            className={s.navlink}
            ><h5>{strings.my_page}</h5>
            </NavLink>

            <NavLink to="/friends"
            className={s.navlink}
            ><h5>{strings.friends}</h5>
            </NavLink>
           
            <NavLink to="/messenger"
            className={s.navlink}
            ><h5>{strings.messenger}</h5>
            </NavLink>
          
            <NavLink to="/news"
            className={s.navlink}
            ><h5>{strings.news}</h5>
            </NavLink>
        </nav>
    );
  
}

export default Navbar;