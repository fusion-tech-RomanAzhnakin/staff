class CustomStorage {
  getItem = (key) => {
    try {
      const data = JSON.parse(localStorage.getItem(key) || 'null');
      return data;
    } catch (error) {
      return null;
    }
  }

  setItem = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // THEME
  THEME = 'user_theme';

  get theme() {
    return this.getItem(this.THEME);
  }

  set theme(value) {
    this.setItem(this.THEME, value);
  }
}

export default new CustomStorage();
