import { PlatformLocation } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'menu',
  standalone: true,
  imports: [FormsModule],
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
  ) {
    const curLocalePath = `/${locale}/`;
    if (platformLocation.href.includes(curLocalePath)) {
      this.redirectUrl = platformLocation.href.replace(
        curLocalePath,
        `/${this.otherLocale}/`,
      );
    } else {
      this.redirectUrl = `${platformLocation.protocol}//${platformLocation.hostname}/${this.otherLocale}/${platformLocation.pathname}`;
    }
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
