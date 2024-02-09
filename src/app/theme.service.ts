import { Injectable } from '@angular/core';

const darkThemeName = 'dark';
const lightThemeName = 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  private readonly lightThemeClass = 'light-theme';

  constructor() {
    this.setMarkdownStyle();
  }

  isDarkMode() {
    return this.darkMode;
  }

  setTheme(isDarkMode: boolean) {
    this.darkMode = isDarkMode;

    document.body.classList.toggle(this.lightThemeClass);
    this.setMarkdownStyle();
  }

  getThemeName(isDarkMode: boolean = this.darkMode) {
    if (isDarkMode) {
      return darkThemeName;
    } else {
      return lightThemeName;
    }
  }

  private setMarkdownStyle() {
    const markdownThemeId = 'markdown-theme-id';
    this.removeOldLink(markdownThemeId);
    const codeStyleUrl = this.isDarkMode()
      ? 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-vsc-dark-plus.min.css'
      : 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-vs.min.css';
    this.createLinkElement(codeStyleUrl, markdownThemeId);
  }

  private createLinkElement(url: string, id: string) {
    const linkElement = document.createElement('link');
    linkElement.id = id;
    linkElement.href = url;
    linkElement.type = 'text/css';
    linkElement.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(linkElement);
  }

  private removeOldLink(id: string) {
    const linkElement = document.getElementById(id);
    linkElement?.remove();
  }
}
