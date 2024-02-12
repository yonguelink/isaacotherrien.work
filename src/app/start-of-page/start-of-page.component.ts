import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'start-of-page',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './start-of-page.component.html',
  styleUrl: './start-of-page.component.sass',
})
export class StartOfPageComponent {
  display: string = 'none';

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  @HostListener('document:scroll', ['$event'])
  onScroll() {
    if (window.scrollY > 500) {
      this.display = 'block';
    } else {
      this.display = 'none';
    }
  }
}
