import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
 const avatarRef = React.useRef()
 function handleSubmit(evt) {
  evt.preventDefault();
  onUpdateAvatar(
   avatarRef.current.value
  );
 }
 return (
  <PopupWithForm title='Обновить аватар' name='_avatar_delete' isOpen={isOpen ? 'popup__opened' : ''} onClose={onClose} onSubmit={handleSubmit}>
   <input
    ref={avatarRef}
    name="avatar"
    id="change-five"
    type="url"
    className="popup__input popup__input_avatar_delete"
    placeholder="Ссылка на картинку"
    required
   />
   <span className="popup__error change-five-error"></span>
  </PopupWithForm>
 )
}