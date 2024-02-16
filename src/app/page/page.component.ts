import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { StartOfPageComponent } from '../start-of-page/start-of-page.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    StartOfPageComponent,
    RouterOutlet,
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.sass',
})
export class PageComponent {}
