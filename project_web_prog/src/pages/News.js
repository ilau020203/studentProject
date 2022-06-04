import React  from 'react';
import LocalizedStrings from 'react-localization';
import {useEffect,useState,useContext,useRef}  from 'react';
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from "../context/AuthContext"
import s from './News.module.css'

import { BrowserRouter as Router,Switch,Route,NavLink} from "react-router-dom";
import Post from "../components/Post.js";
import CreatePost from "../components/CreatePost.js";



const News =(props)=>{
  
  const auth = useContext(AuthContext)

  const [posts , setPosts]= useState([])
  const [update , setUpdate]= useState(0)
  const {loading, request, error, clearError} = useHttp()
  useEffect(()=>{ (async function() {
    try {
      const data = await request('/post/all', 'GET',null, {
        Authorization: `Bearer ${auth.token}`
      })
      console.log(data)
      setPosts(data)
      console.log(error)
    } catch (e) {
      console.log(e)
      console.log(error)
    }
    
  })()
},[update]);


useRelaxedInterval(async () => {

  try {
    const data = await request('/post/all', 'GET',null, {
      Authorization: `Bearer ${auth.token}`
    })
    console.log(data)
    setPosts(data)
    console.log(error)
  } catch (e) {
    console.log(e)
    console.log(error)
  }
  console.log('Hello world!');
  
}, 5000);

let strings = new LocalizedStrings({

  en:{
      news:"Your friends' posts",
   },
  ru: {
      news:"Публикации ваших друзей",
  }
 });
strings.setLanguage(auth.language)
   
    return (<>
      <div><h4>{strings.news}</h4></div>
      <div className={s.ribbon} >
      <CreatePost setUpdate={setUpdate}  update = {update}>
      </CreatePost>
      


      {
        posts.slice(0).reverse().map((value,i)=>{

          console.log( value.likes.find((e)=>{
          
            return e.id===auth.id
          
          }
            
            ),'asdf')
          return(<Post 
          date = {value.createdAt}
          username = {value.author.username}
          key={i}
          text={value.text}
           title={value.title}
           setUpdate={setUpdate} 
            update = {update}
            count = {value.likes.length}
            enable = {!value.likes.find((e)=>{
              
              return e.id===auth.id
            
            }
              
              ) }
            like= {()=>{
              request('/post/'+value.id+'/add-like', 'Post',null, {
                Authorization: `Bearer ${auth.token}`
              }).then(()=>{
                setUpdate( update+1)
              })
            }}
           >
          
            </Post>)
        })
      }       
       
      </div>
      </>
    );
    function useRelaxedInterval(callback, delay) {
      const savedCallback = useRef();
    
      useEffect(
        () => {
          savedCallback.current = callback;
        },
        [callback]
      );
    
      useEffect(
        () => {
          //running is local to each iteration of this effect
          //so won't pollute anything if the user starts polling again
          let running = false;
          let savedTimeout = null;
    
          const tick = async () => {
            if (running) {
              await savedCallback.current();
            }
    
            if (running) {
              savedTimeout = setTimeout(tick, delay);
            }
          };
    
          const stop = () => {
            running = false;
            const timeout = savedTimeout;
    
            if (timeout !== null) {
              clearTimeout(timeout);
            }
          };
    
          if (delay !== null) {
            running = true;
            savedTimeout = setTimeout(tick, delay);
            return stop;
          }
        },
        [delay]
      );
    }
    
}

export default News;