import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { MenuComponent } from '../menu/menu.component';
import { RouterLink } from '@angular/router';

const email = 'isaac.computing@gmail.com';

@Component({
    selector: 'header',
    imports: [ThemeToggle, FormsModule, CommonModule, MenuComponent, RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
  avatarUrl: Promise<string>;

  constructor() {
    this.avatarUrl = getGravatar(email, 80);
  }
}

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function getGravatar(message: string, width: number): Promise<string> {
  const baseUrl = 'https://gravatar.com/avatar/';
  const hash = await sha256(message);
  return `${baseUrl}${hash}?s=${width}`;
}
