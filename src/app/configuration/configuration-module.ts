import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './components/config/config.component';
import {ConfigurationRoutingModule} from './configuration-routing-module';
import {SharedModule} from '../shared/shared-module';
import { ConfigItemComponent } from './components/config-item/config-item.component';
import {ConfigurationsService} from './services/configurations.service';



@NgModule({
  declarations: [
    ConfigComponent,
    ConfigItemComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    SharedModule,
  ],
  providers: [
    ConfigurationsService,
  ]
})
export class ConfigurationModule { }
