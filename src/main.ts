import { provideZoneChangeDetection } from "@angular/core";
/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { PageComponent } from './app/page/page.component';

bootstrapApplication(PageComponent, {...appConfig, providers: [provideZoneChangeDetection(), ...appConfig.providers]}).catch((err) =>
  console.error(err),
);
