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

  setUserInfo(data) {
    this._userNameElement.textContent = data.name;
    this._descriptionElement.textContent = data.description;
  }
}
