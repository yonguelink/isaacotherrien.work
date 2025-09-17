import { Injectable, afterNextRender } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode: boolean = true;
  private readonly lightThemeClass = 'light-theme';

  constructor() {
    afterNextRender(
      { mixedReadWrite: () => {
        this.darkMode = this.defaultIsDarkMode();
        this.setTheme(this.darkMode);
    } },
      ,
    );
  }

  private defaultIsDarkMode(): boolean {
    const lastSetValue = localStorage.getItem('isDarkMode');

    if (lastSetValue !== null) {
      return lastSetValue === 'true';
    }

    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }

  isDarkMode() {
    return this.darkMode;
  }

  setTheme(isDarkMode: boolean) {
    this.darkMode = isDarkMode;
    localStorage.setItem('isDarkMode', `${isDarkMode}`);

    if (isDarkMode) {
      document.body.classList.remove(this.lightThemeClass);
    } else {
      document.body.classList.add(this.lightThemeClass);
    }

    this.setMarkdownStyle();
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
