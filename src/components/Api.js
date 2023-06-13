export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._authorization = config.headers.authorization;
    this._id = config.id;
  }

  _handleResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  }

  getInitialCardsApi() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json',
      },
    }).then(this._handleResponse);
  }

  postCardApi(name, link) {
   return fetch(`${this._url}/cards`, {
     method: 'POST',
     headers: {
       authorization: this._authorization,
       'Content-type': 'application/json',
     },
     body: JSON.stringify({
       name: name,
       link: link,
     }),
   }).then(this._handleResponse);
  }

  getUserInfoApi() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json',
      },
    }).then(this._handleResponse);
  }

  setUserInfoApi(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._handleResponse);
  }

  putLikeApi(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json',
      },
    }).then(this._handleResponse);
  }

  deleteLikeApi(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json',
      },
    }).then(this._handleResponse);
  }

  deleteCardApi(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json',
      },
    }).then(this._handleResponse);
  }

  // changeAvatar() {
  //   fetch(``)
  // }
}
