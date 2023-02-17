import React from "react";

function PopupWithForm(props) {
 return (
  <div className={`popup popup${props.name} ${props.isOpen}`}>
   <button className={`popup__close popup__close${props.name}`} type="button" onClick={props.onClose}></button>
   <form className={`popup__container popup__container${props.name}`} name={props.name} noValidate onSubmit={props.onSubmit}>
    <h2 className={`popup__title popup__title${props.name}`}>{props.title}</h2>
    {props.children}
    <button className={`popup__save popup__save${props.name}`} type='save'>Сохранить</button>
   </form>
  </div>
 )
}

export default PopupWithForm;
