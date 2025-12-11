import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {SharedModule} from '../shared/shared-module';
import {RouterLink} from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterLink,
  ]
})
export class CoreModule { }
