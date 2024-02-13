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
  closeMenu() {
    this.menuOpen = false;
  }
}
