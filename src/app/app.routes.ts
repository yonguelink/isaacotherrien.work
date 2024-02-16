import { Routes } from '@angular/router';
import { CodeComponent } from './code/code.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'code', component: CodeComponent },
  { path: '', component: HomeComponent },
];
