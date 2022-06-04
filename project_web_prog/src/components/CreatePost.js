import React  from 'react';
import {useEffect,useState,useContext}  from 'react';
import {useHttp} from '../hooks/http.hook'
import LocalizedStrings from 'react-localization';
import {AuthContext} from "../context/AuthContext"
import s from './Header.module.css'

import { BrowserRouter as Router,Switch,Route,NavLink} from "react-router-dom";

const CreatePost =(props)=>{
    const [title, setTitle]= useState(sessionStorage.getItem('title'))
    const [text, setText]= useState(sessionStorage.getItem('text'))

    const auth = useContext(AuthContext)

    
    const {loading, request, error, clearError} = useHttp()

    let strings = new LocalizedStrings({

      en:{
          title:"Title",
          text:"Your message",
          toPost:"Post",
      },
      ru: {
        title:"Заголовок",
        text:"Ваше сообшение",
        toPost:"Опубликовать",
      }
     });

  strings.setLanguage(auth.language)
    return (
    <form onSubmit={(event) => {
                    event.preventDefault()
                     request('/post/create', 'Post',{text , title:title}, {
                        Authorization: `Bearer ${auth.token}`
                      }).then(()=>{
                        props.setUpdate( props.update+1)
                      })
                    
                    }}>

            
            <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default"><h5 style={{float: 'left'}}>{strings.title}</h5></span>
            <input type="text" className="form-control" value={title} onChange={(input)=>{
              console.log(input.target.value,)
              sessionStorage.setItem('title', input.target.value)
              setTitle( input.target.value)
          }}   aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"></input>
            </div>
           
            <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default"><h5 style={{float: 'left'}}>{strings.text}</h5></span>
            <input type="text" className="form-control" value={text} onChange={(input)=>{
              console.log(input.target.value)
              sessionStorage.setItem('text', input.target.value)
              setText( input.target.value)
          }}   aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" ></input>
            </div>
            <button className="btn" style={{backgroundColor: 'rgb(25, 25, 25)', color: 'whitesmoke'}}>{strings.toPost}</button>
            
        </form>
         );
  
        }
        
        export default CreatePost;