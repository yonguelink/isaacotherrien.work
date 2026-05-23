import { Routes } from '@angular/router';
import { CodeComponent } from './code/code.component';
import { HomeComponent } from './home/home.component';
import { CarComponent } from './car/car.component';

export const routes: Routes = [
  { path: 'code', component: CodeComponent },
  { path: '', component: HomeComponent },
  { path: 'car', component: CarComponent },
];
