import React, { useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
 const context = React.useContext(CurrentUserContext)
 const [name, setName] = React.useState('')
 const [description, setDescription] = React.useState('')

 function handleChangeName(evt) {
  setName(evt.target.value)
 }
 function handleChangeDescription(evt) {
  setDescription(evt.target.value)
 }
 useEffect(() => {
  setName(context.name)
  setDescription(context.about)
 }, [isOpen])

 function handleSubmit(evt) {
  evt.preventDefault();
  onUpdateUser({
   name: name,
   about: description,
  });
 }
 return (
  <PopupWithForm title='Редактировать профиль' name='_change_profile' isOpen={isOpen ? 'popup__opened' : ''} onClose={onClose} onSubmit={handleSubmit}>
   <input
    value={name || ''}
    onChange={handleChangeName}
    name="name"
    id="change-one"
    type="text"
    className="popup__input popup__input_type_name"
    required
    minLength="2"
    maxLength="40"
    placeholder="Имя"
   />
   <span className="popup__error change-one-error"></span>

   <input
    value={description || ''}
    onChange={handleChangeDescription}
    name="about"
    id="change-two"
    type="text"
    className="popup__input popup__input_type_text"
    required
    minLength="2"
    maxLength="200"
    placeholder="Описание"
   />
   <span className="popup__error change-two-error"></span>
  </PopupWithForm>

 )
}
