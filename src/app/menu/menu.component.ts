import { PlatformLocation, Location } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'menu',
  imports: [FormsModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  menuOpen: boolean = false;
  readonly otherLocale = $localize`fr`;
  redirectUrl: string;

  constructor(
    platformLocation: PlatformLocation,
    @Inject(LOCALE_ID) locale: string,
    location: Location,
  ) {
    this.redirectUrl = this.setRedirectUrl(platformLocation, locale);
    location.onUrlChange(() => {
      this.redirectUrl = this.setRedirectUrl(platformLocation, locale);
    });
  }

  setRedirectUrl(platformLocation: PlatformLocation, locale: string) {
    const curLocalePath = `/${locale}/`;
    if (platformLocation.href.includes(curLocalePath)) {
      return platformLocation.href.replace(
        curLocalePath,
        `/${this.otherLocale}/`,
      );
    } else {
      return `${platformLocation.protocol}//${platformLocation.hostname}/${this.otherLocale}${platformLocation.pathname}`;
    }
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
