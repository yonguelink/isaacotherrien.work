import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'about',
  standalone: true,
  imports: [MarkdownComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.sass',
})
export class AboutComponent {}
