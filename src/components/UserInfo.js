export default class UserInfo {
  constructor({ userNameElement, descriptionElement }) {
    this._userNameElement = document.querySelector(userNameElement);
    this._descriptionElement = document.querySelector(descriptionElement);
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo(info) {
    this._userNameElement.textContent = info.username;
    this._descriptionElement.textContent = info.description;
  }
}
