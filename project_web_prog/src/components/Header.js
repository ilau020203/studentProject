import React  from 'react';
import LocalizedStrings from 'react-localization';

import s from './Header.module.css'
import {useEffect,useState,useContext}  from 'react';
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from "../context/AuthContext"
import { BrowserRouter as Router,Switch,Route,NavLink} from "react-router-dom";

import Select from 'react-select';

const options = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' },
];

const Header =(props)=>{
  const auth = useContext(AuthContext)
  const [selectedOption, setSelectedOption] = useState('en')
  
  let strings= new LocalizedStrings({
    en:{
        logout: "Log out",
        social: "DayNa and Ilau"
    },
    ru: {
        logout: "Выйти",
        social: "Биба и Боба"
    }
   })  

  let handleChange = (selectedOption) => {
    auth.setLanguage(selectedOption.value)
    console.log(strings.getLanguage())
      console.log(`Option selected:`, selectedOption)
      strings.setLanguage(selectedOption.value)
      auth.language=selectedOption.value;
      setSelectedOption( selectedOption )
  };
  
  strings.setLanguage(auth.language)

    return (
      <header className='header'>
        
        <class className='logo'>
          <h4 style={{textAlign: ''}}>
            {strings.social}  
          </h4>
        </class>

        <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        ></Select>

        <div id='button'>
          <button 
          style={{backgroundColor: 'rgb(50, 50, 50)'}}
          onClick={auth.logout}>
            <h5>{strings.logout}</h5>
          </button> 
        </div>
      </header>
    );
}

export default Header;