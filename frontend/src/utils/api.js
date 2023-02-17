const key = '419bb80a-4ebd-4553-87ef-7a869fedad61'

const url = 'https://mesto.nomoreparties.co/v1/cohort-51'

export class Api {
  constructor(options) {
    this._authorization = options.authorization;
    this._url = options.url;
  }
  _returnPromise(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res.status)

  }
  // Запрос получения данных пользователя
  userInformationGet() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._returnPromise)
  }
  // Данные всех карточек
  cards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._returnPromise)
  }
  // Сохранение данных пользователя на сервере PATCH
  userInformationPath({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
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
  cardPost({ name, src }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
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
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      }
    })
      .then(this._returnPromise)
  }
  // Работа с лайками карточки
  changeLikeCard(id, islike) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: islike ? 'DELETE' : 'PUT',
      headers: {
        authorization: this._authorization,
      }
    })
      .then(this._returnPromise)
  }
  // PATCH Запрос редактирования фотографии
  changeAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar,
      })
    })
      .then(this._returnPromise)
  }
}


const api = new Api({ authorization: key, url: url })

export default api;
