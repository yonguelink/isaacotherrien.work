/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { PageComponent } from './app/page/page.component';

bootstrapApplication(PageComponent, appConfig).catch((err) =>
  console.error(err),
);
