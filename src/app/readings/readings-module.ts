import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadingListComponent } from './components/reading-list/reading-list.component';
import {ReadingsRoutingModule} from './readings-routing-module';
import {ReadingsService} from './services/readings.service';
import {SharedModule} from '../shared/shared-module';
import { ReadingListItemComponent } from './components/reading-list-item/reading-list-item.component';
import { ReadingDetailComponent } from './components/reading-detail/reading-detail.component';



@NgModule({
  declarations: [
    ReadingListComponent,
    ReadingListItemComponent,
    ReadingDetailComponent
  ],
  imports: [
    CommonModule,
    ReadingsRoutingModule,
    SharedModule,
  ],
  providers: [
    ReadingsService
  ]
})
export class ReadingsModule { }
