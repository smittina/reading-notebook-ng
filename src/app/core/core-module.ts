import {LOCALE_ID, NgModule} from '@angular/core';
import * as fr from '@angular/common/locales/fr';
import {CommonModule, registerLocaleData} from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {SharedModule} from '../shared/shared-module';
import {RouterLink} from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterLink,
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ]
})
export class CoreModule {

  constructor() {
    registerLocaleData(fr.default);
  }

}
