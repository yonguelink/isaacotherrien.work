import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app/app.config.server';
import { PageComponent } from './app/page/page.component';

const bootstrap = () => bootstrapApplication(PageComponent, config);

export default bootstrap;
