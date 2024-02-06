import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = true;
  private lightThemeClass = 'light-theme';

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
}
