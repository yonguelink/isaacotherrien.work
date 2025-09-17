import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { config } from './app/app.config.server';
import { PageComponent } from './app/page/page.component';

const bootstrap = (context: BootstrapContext) => bootstrapApplication(PageComponent, config, context);

export default bootstrap;
