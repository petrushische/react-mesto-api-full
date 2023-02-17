import React from "react";
import logoTrue from '../../images/logo-info.svg';
import logoFalse from '../../images/logo-info-false.svg';

export default function InfoTooltip({ isOpen, closePopup, checkValid }) {

 return (
  <div className={`popup info-popup ${isOpen}`}>
   <div className="info-popup__wrapper">
    <button className="info-popup__close-button" onClick={closePopup}></button>
    <img
     src={checkValid > 399 ? logoFalse : logoTrue}
     alt="Лого ответа"
     className="info-popup__logo"
    />
    <p className="info-popup__text">{checkValid > 399 ? 'Что-то пошло не так! Попробуйте ещё раз' : 'Вы успешно зарегистрировались!'}</p>
   </div>
  </div>
 )
}



