import React  from 'react';
import LocalizedStrings from 'react-localization';
import {useEffect,useState,useContext}  from 'react';
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from "../context/AuthContext"
import s from './Header.module.css'

import { BrowserRouter as Router,Switch,Route,NavLink} from "react-router-dom";

const Friends =(props)=>{
    const auth = useContext(AuthContext)

    const [users , setUsers]= useState([])
    const {loading, request, error, clearError} = useHttp()
    useEffect( async() => {
      try {
        const data = await request('/user', 'GET',null, {
          Authorization: `Bearer ${auth.token}`
        })
        console.log(data)
        setUsers(data)
        console.log(error)
      } catch (e) {
        console.log(e)
        console.log(error)
      }
      
    },[]);
    
    let strings = new LocalizedStrings({

        en:{
            empty_friends:"Oops, you haven't added anyone yet",
            non_empty_friends:"Your friends:"
        },
        ru: {
          empty_friends:"Похоже, вы еще никого не добавили",
          non_empty_friends:"Ваши друзья:"
        }
       });
    strings.setLanguage(auth.language)

    return (
      <div >
        <h4>{strings.empty_friends}</h4>
        {users.map((value)=>{
          return (
          <p>{value.email}</p>
          )
        })}
      </div>
    );
  
}

export default Friends;