import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
export default function AddPlacePopup({ isOpen, onClose, onUpdateAvatar }) {
 const nameRef = React.useRef()
 const srcRef = React.useRef()
 function handleAddPlaceSubmit(evt) {
  evt.preventDefault();
  onUpdateAvatar({
   name: nameRef.current.value,
   src: srcRef.current.value
  })
 }
 return (
  <PopupWithForm title='Новое место' name='_cards_add' isOpen={isOpen ? 'popup__opened' : ''} onClose={onClose} onSubmit={handleAddPlaceSubmit}>
   <input
    ref={nameRef}
    name="name"
    id="change-three"
    type="text"
    className="popup__input popup__input-cards-add-name"
    placeholder="Название"
    required
    minLength="2"
    maxLength="30"
   />
   <span className="popup__error change-three-error"></span>
   <input
    ref={srcRef}
    name="about"
    id="change-four"
    type="url"
    className="popup__input popup__input-cards-add-link"
    placeholder="Ссылка на картинку"
    required
   />
   <span className="popup__error change-four-error"></span>
  </PopupWithForm>

 )
}