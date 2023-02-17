import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import trash from '../../images/button-trash.svg'
import like from '../../images/Like1.svg'
import likeActive from '../../images/Like-active.svg'
function Card({ card, /*onDeleteCardForCard,*/ onCardClick, onCardLike, onCardDelete }) {
 const userDate = React.useContext(CurrentUserContext)
 function handleClick() {
  onCardClick(card.link, card.name)
 }
 function handleLikeClick() {
  onCardLike(card)
 }
 function handleDeleteClick() {
  onCardDelete(card)
 }
 // показывать корзину или нет
 const isOwn = card.owner._id === userDate._id
 // лайки
 const isliked = card.likes.some(elem => elem._id === userDate._id)
 return (
  <li className="foto-grid__element">
   <button className={`foto-grid__trash ${isOwn ? 'foto-grid__trash_visible' : ''}`} type="button" style={{ backgroundImage: `url(${trash})` }} onClick={handleDeleteClick}></button>
   <img className="foto-grid__foto" src={card.link} onClick={handleClick} alt={card.name} />
   <div className="foto-grid__title">
    <h2 className="foto-grid__title-text">{card.name}</h2>
    <button className="foto-grid__button" type="button" style={{ backgroundImage: isliked ? `url(${likeActive})` : `url(${like})` }} onClick={handleLikeClick}></button>
    <span className="foto-grid__counter">{card.likes.length}</span>
   </div>
  </li>
 )
}


export default Card;