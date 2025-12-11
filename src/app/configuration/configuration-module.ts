import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './components/config/config.component';
import {ConfigurationRoutingModule} from './configuration-routing-module';



@NgModule({
  declarations: [
    ConfigComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
  ]
})
export class ConfigurationModule { }
