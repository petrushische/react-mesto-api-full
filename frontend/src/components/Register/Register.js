import React from "react";
import { useHistory } from "react-router-dom";
import { Link, Route, Redirect, } from 'react-router-dom';

export default function Register({ handleRegistr, handleinfoTooltip }) {
 const [userData, setUserData] = React.useState({
  email: '',
  password: '',
 })
 const [messag, setMessage] = React.useState('');

 function handleChange(evt) {
  const { name, value } = evt.target
  setUserData({
   ...userData,
   [name]: value
  })
 }
 function handleSubmit(evt) {
  evt.preventDefault();
  if (!userData.email || !userData.password) {
   return
  }
  handleRegistr(userData.email, userData.password)
  handleClick()
  handleinfoTooltip();
 }
 const history = useHistory();

 function handleClick() {
  history.push('/sign-in');
 }

 return (
  <div className="auth">
   <h2 className="auth__title">Регистрация</h2>
   <form className='auth__form' name="Register" onSubmit={handleSubmit}>
    <input
     required
     value={userData.email}
     onChange={handleChange}
     className='auth__input'
     name="email"
     type="email"
     placeholder="Email">
    </input>
    <input
     required
     value={userData.password}
     onChange={handleChange}
     className='auth__input'
     name="password"
     type="password"
     placeholder="Пароль">
    </input>
    <button type="save" className='auth__button-save'>Зарегестрироваться</button>
   </form>
   <h3 className='auth__subtitle'>Уже зарегистрированы? <Route path="/sign-up"><Link to='sign-in' className="auth__subtitle-button">Войти</Link></Route></h3>
  </div>

 )
}