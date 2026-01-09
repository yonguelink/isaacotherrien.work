import { Component } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'footer',
  imports: [MatIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.sass',
})
export class FooterComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.registerIcon('github', iconRegistry, sanitizer);
    this.registerIcon('linkedin', iconRegistry, sanitizer);
    this.registerIcon('source', iconRegistry, sanitizer);
  }

  private registerIcon(
    name: string,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
  ) {
    iconRegistry.addSvgIcon(
      name,
      sanitizer.bypassSecurityTrustResourceUrl(`/assets/${name}.svg`),
    );
  }
}
