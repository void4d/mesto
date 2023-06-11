export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._authorization = config.headers.authorization;
    this._id = config.id;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  postCard(name, link) {
    fetch('https://mesto.nomoreparties.co/v1/cohort-68/cards', {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  getUserServerInfo() {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-68/users/${this._id}`, {
      method: 'GET',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }

  setUserServerInfo(name, about) {
    fetch(`https://nomoreparties.co/v1/cohort-68/users/${this._id}`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }
}
