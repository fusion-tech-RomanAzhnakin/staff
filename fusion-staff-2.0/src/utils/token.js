import cookie from 'js-cookie';

class CookieItem {
  constructor(name) {
    this.name = name;
  }

  get() {
    return cookie.get(this.name);
  }

  set(token) {
    return cookie.set(this.name, token);
  }
}

export default {
  access: new CookieItem('token'),
  refresh: new CookieItem('refresh'),
};
