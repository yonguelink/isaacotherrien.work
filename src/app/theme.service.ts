import { Injectable } from '@angular/core';

const darkThemeName = 'dark';
const lightThemeName = 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  private readonly lightThemeClass = 'light-theme';

  isDarkMode() {
    return this.darkMode;
  }

  setTheme(isDarkMode: boolean) {
    this.darkMode = isDarkMode;

    if (!isDarkMode) {
      document.body.classList.add(this.lightThemeClass);
    } else {
      document.body.classList.remove(this.lightThemeClass);
    }
  }

  getThemeName(isDarkMode: boolean = this.darkMode) {
    if (isDarkMode) {
      return darkThemeName;
    } else {
      return lightThemeName;
    }
  }
}
