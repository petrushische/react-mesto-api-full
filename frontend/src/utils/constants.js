// настройки для валидации
const settings = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  errorClassVisible: 'popup__error_visible'
};

/*import karach from '../images/Замок.png'
import gora from '../images/Эльбрус.png'
import domb from '../images/Домбай.png'
*/




// Спринт 4
// кнопка открытия
const popupChangeOpen = document.querySelector(".profile__button-edit");

// данные попапа 1
const name = document.querySelector('.profile__title')
const about = document.querySelector('.profile__subtitle')
const avatar = document.querySelector('.profile__avatar')

// попап для удаления карточки
const cardSaveDelete = document.querySelector('.popup__save_card_delete')


// кнопка открытия попапа добавления карточки
const buttonCardsAdd = document.querySelector(".profile__button-add");


// кнопка открытия попапа изменения аватара
const buttonChangeAvatar = document.querySelector('.profile__wrapper')

// форма добавления карточки 
const formCardsAdd = document.querySelector(".popup__container-cards-add");

//форма изменения данных 
const formNameChange = document.querySelector(".popup__container");

// форма редактирования аватара
const formAvatarChange = document.querySelector(".popup__container_avatar_delete")

// Функция загрузки данных
function renderLoading(isLoading) {
  const button = document.querySelectorAll('.popup__save')
  button.forEach((item) => {
    if (isLoading) {
      item.textContent = 'Cохранение...'
    } else {
      item.textContent = 'Сохранить'
    }
  })
}

export {
  settings,
  popupChangeOpen,
  buttonCardsAdd,
  formCardsAdd,
  formNameChange,
  formAvatarChange,
  name,
  about,
  avatar,
  cardSaveDelete,
  buttonChangeAvatar,
  renderLoading
}