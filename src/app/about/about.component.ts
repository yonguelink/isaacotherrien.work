import { Component, Inject, LOCALE_ID } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'about',
  standalone: true,
  imports: [MarkdownComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.sass',
})
export class AboutComponent {
  markdownFilePath: string;
  constructor(@Inject(LOCALE_ID) locale: string) {
    this.markdownFilePath = `assets/content/${locale}/about.md`;
  }
}
