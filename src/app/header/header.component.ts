import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'header',
  standalone: true,
  imports: [ThemeToggle, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  avatarUrl: Promise<string>;

  constructor(private themeService: ThemeService) { 
    this.avatarUrl = getGravatar("isaac.computing@gmail.com", 150);
  }

  getThemeName() {
    return this.themeService.getThemeName();
  }
}

async function sha256(message: string) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);                    

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string                  
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

async function getGravatar(message: string, size: number) {
  const baseUrl = 'https://gravatar.com/avatar/';
  const hash = await sha256(message);
  return `${baseUrl}${hash}?s=${size}`;
}