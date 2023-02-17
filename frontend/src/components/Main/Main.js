import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Footer from "../Footer/Footer";

import Card from "../Card/Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, /*onDeleteCard,*/ onCardClick, cards, onCardLike, onCardDelete }) {
  const userDate = React.useContext(CurrentUserContext)

  return (
    <>
      <main className="main">
        <section className="profile">
          <div className="profile__wrapper" onClick={onEditAvatar}>
            <img
              src={userDate.avatar}
              alt="Жак-Ив Кусто"
              className="profile__avatar"
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{userDate.name}</h1>
            <button className="profile__button-edit" type="button" onClick={onEditProfile}></button>
            <p className="profile__subtitle">{userDate.about}</p>
          </div>
          <button className="profile__button-add" type="button" onClick={onAddPlace}></button>
        </section>
        <section className="foto-grid" aria-label="Карточки">
          <ul className="foto-grid__elements">
            {cards.map((elem) => (
              <Card card={elem} key={elem._id} /*onDeleteCardForCard={onDeleteCard}*/ onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  )
}



export default Main;