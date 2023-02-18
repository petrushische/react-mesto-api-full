const url = 'https://api.PetroSellinum.nomoredomains.work'

export class Api {
  constructor(options) {
    this._url = options.url;
  }
  _returnPromise(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res.status)

  }

  // Запрос получения данных пользователя
  userInformationGet(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(this._returnPromise)
  }
  // Данные всех карточек
  cards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(this._returnPromise)
  }
  // Сохранение данных пользователя на сервере PATCH
  userInformationPath({ name, about }, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._returnPromise)
  }
  // Моя карточка
  cardPost({ name, src }, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: src,

      })
    })
      .then(this._returnPromise)
  }
  // Запрос удаления карточки
  deleteCard(id, token) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
      .then(this._returnPromise)
  }
  // Работа с лайками карточки
  changeLikeCard(id, islike, token) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: islike ? 'DELETE' : 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
      .then(this._returnPromise)
  }
  // PATCH Запрос редактирования фотографии
  changeAvatar(avatar, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar,
      })
    })
      .then(this._returnPromise)
  }
}


const api = new Api({ url: url })

export default api;
