import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'code',
  imports: [MarkdownComponent],
  templateUrl: './code.component.html',
  styleUrl: './code.component.sass',
})
export class CodeComponent {}
