/*
   Title : Online Grocery Store
   Author : Kalaivani G
   Created At : 21-04-2023
   Updated At : 01-08-2023
   Reviewed By :
   Reviewed At : 02-08-2023

*/

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
