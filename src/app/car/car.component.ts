import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'car',
  imports: [FormsModule],
  templateUrl: './car.component.html',
  styleUrl: './car.component.sass',
})
export class CarComponent {
  private readonly now = new Date();
  private readonly start = new Date(2026, 1, 25);
  private readonly daysSinceStart = Math.floor(
    (this.now.getTime() - this.start.getTime()) / (1000 * 60 * 60 * 24),
  );
  private readonly kmPerYear = 20000;
  private readonly kmPerDay = this.kmPerYear / 365.25;
  protected readonly totalKmAllowed = Math.floor(
    this.daysSinceStart * this.kmPerDay,
  );
}
