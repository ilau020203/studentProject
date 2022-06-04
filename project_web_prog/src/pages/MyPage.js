import React  from 'react';
import LocalizedStrings from 'react-localization';

import s from './Header.module.css'

import {useContext}  from 'react';
import {AuthContext} from "../context/AuthContext"
import Friends from './Friends';

const Header =(props)=>{
  const auth = useContext(AuthContext)
  let strings = new LocalizedStrings({

      en:{
        empty_page:"Make sure you added info about yourself",
        non_empty_page:"Your page:"
      },
      ru: {
        empty_page:"Добавьте больше информации о себе",
        non_empty_page:"Ваша страница:"
      }
     });

  strings.setLanguage(auth.language)

  return (
    <div className={s.any}>
    <h4>{strings.empty_page}</h4>
    </div>
  );

}

export default Friends;