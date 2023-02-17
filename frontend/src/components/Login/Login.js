import React from "react";
import { Redirect } from "react-router-dom";
export default function Login({ handleLogin, isLoggedIn }) {
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
  handleLogin(userData.email, userData.password)
 }
 if (isLoggedIn) {
  return <Redirect to="/" />
 }
 return (
  <div className="auth">
   <h2 className="auth__title">Вход</h2>
   <form className='auth__form' name="Login" onSubmit={handleSubmit}>
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
    <button type="save" className='auth__button-save'>Войти</button>
   </form>
  </div>
 )
}