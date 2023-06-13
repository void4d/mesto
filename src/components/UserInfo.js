export default class UserInfo {
  constructor({ userNameElement, aboutElement, id }) {
    this._userNameElement = document.querySelector(userNameElement);
    this._aboutElement = document.querySelector(aboutElement);
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      about: this._aboutElement.textContent,
    };
  }

  setUserInfo(data) {
    this._userNameElement.textContent = data.name;
    this._aboutElement.textContent = data.about;
    this._userId = data._id;
  }
}
