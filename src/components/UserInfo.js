export default class UserInfo {
  constructor({ userNameElement, aboutElement, avatarElement }) {
    this._userNameElement = document.querySelector(userNameElement);
    this._aboutElement = document.querySelector(aboutElement);
    this._avatarElement = document.querySelector(avatarElement);
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement,
    };
  }

  setUserInfo(data) {
    this._userNameElement.textContent = data.name;
    this._aboutElement.textContent = data.about;
    this._userId = data._id;
  }

  setUserAvatar(data) {
    this._avatarElement.src = data.avatar;
  }
}
