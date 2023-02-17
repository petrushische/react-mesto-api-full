import React, { useEffect, useCallback } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ImagePopup from "./ImagePopup/ImagePopup";
/*import { popupCardsAdd, popupChangeProfile, popupChangeFoto } from "./PopupWithForm/PopupWithForm";*/
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import * as Auth from '../utils/Author'

function App() {


  const [currentUser, setCurrentUser] = React.useState({});
  useEffect(() => {
    api.userInformationGet()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => console.log(err))


  }, [])

  //1
  const [cards, setCards] = React.useState([]);
  //2
  useEffect(() => {

    api.cards()
      .then((res) => {
        setCards(res)
      })
      .catch((err) => console.log(`Ошибка${err}`))


  }, [])
  //3
  function handleCardLike(card) {
    const isliked = card.likes.some(elem => elem._id === currentUser._id)
    api.changeLikeCard(card._id, isliked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err))
  }
  //4
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((res) => {
        //////////////////////////////////////////////////////////////////////
        const newCard = cards.filter((elem) => elem._id !== card._id)
        setCards(newCard)
        ////////////////////////////////////////////////////////////////////////
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //состояния для открытия попАпов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  /*const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);*/

  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleEditProfileClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsEditAvatarPopupOpen(true)
  }
  /* function handleDeleteCard() {
     setIsDeleteCardPopupOpen(true)
   }*/
  function handleCardClick(url, text) {
    setSelectedCard({ url, text })
  }


  // обработчик закрытия поп апов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    /*setIsDeleteCardPopupOpen(false)*/
    setSelectedCard({})
    setInfoTooltip(false)
  }
  // обновление данных пользователя
  function handleUpdateUser({ name, about }) {
    api.userInformationPath({ name, about })
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // обновление аватара
  function handleUpdateAvatar(avatar) {
    api.changeAvatar(avatar)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // Новая карточка
  function handleNewCard({ name, src }) {
    api.cardPost({ name, src })
      .then((res) => {
        setCards([res, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Спринт 12
  const [checkValid, setCheckValid] = React.useState();
  const [infoTooltip, setInfoTooltip] = React.useState(false)
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({})
  const cbAuthnticate = useCallback((data) => {
    localStorage.setItem('jwt', data.token)
    setLoggedIn(true);
  }, [])

  function handleinfoTooltip() {
    setInfoTooltip(true)
  }
  const tokenCheck = useCallback(async () => {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        throw new Error('no token')
      }
      const user = await Auth.checkToken(token);

      if (!user) {
        throw new Error('invalid user')
      }
      if (user) {
        setLoggedIn(true)
        setUserData(user.data)
      }
    } catch (err) {

    }
  }, [])
  const cbLogin = useCallback(async (email, password) => {
    try {
      const data = await Auth.authorize(email, password)
      if (!data) {
        throw new Error('Неверное имя или пароль')
      }
      if (data.token) {
        cbAuthnticate(data)
      }
    } catch {

    }
  }, [cbAuthnticate])

  const cbRegister = useCallback(async (email, password) => {
    try {
      const data = await Auth.register(email, password)
      localStorage.setItem('jwt', data.token)
    } catch (res) {
      setCheckValid(res)
    }
  }, [cbAuthnticate])

  const cbLogout = useCallback(() => {
    setLoggedIn(false)
    localStorage.clear()
    setUserData({})
  })

  useEffect(() => {
    tokenCheck()
  }, [tokenCheck])
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userData={userData} cbLogout={cbLogout} />
        <Switch>
          <ProtectedRoute
            path="/"
            exact
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditAvatarClick}
            onAddPlace={handleEditProfileClick}
            onEditAvatar={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-up">
            <Register handleRegistr={cbRegister} isLoggedIn={loggedIn} handleinfoTooltip={handleinfoTooltip} />
          </Route>
          <Route path="/sign-in">
            <Login handleLogin={cbLogin} isLoggedIn={loggedIn} />
          </Route>
        </Switch>
        {/*<Route>
          {loggedIn ? (<Redirect to="/" />) : (<Redirect to="/sign-in" />)}
        </Route>*/}
      </div>
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      {/*<PopupWithForm title='Вы уверены?' name='_card_delete' isOpen={isDeleteCardPopupOpen ? 'popup__opened' : ''} onClose={closeAllPopups} />*/}
      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={Object.entries(selectedCard).length === 0 ? '' : 'popup__opened'} />
      < EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleNewCard} />
      <InfoTooltip isOpen={infoTooltip ? 'popup__opened' : ''} closePopup={closeAllPopups} checkValid={checkValid} />
    </CurrentUserContext.Provider >

  );
}

export default App;



