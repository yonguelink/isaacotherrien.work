import { PlatformLocation } from '@angular/common';
import { Component } from '@angular/core';
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
  redirectSubdomain = $localize`fr`;
  redirectUrl: string;

  constructor(platformLocation: PlatformLocation) {
    this.redirectUrl = `${platformLocation.protocol}//${this.redirectSubdomain}.${platformLocation.hostname.replace(/^(en|fr)\./, '')}${platformLocation.pathname}`;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
