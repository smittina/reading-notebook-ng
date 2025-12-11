import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadingListComponent } from './components/reading-list/reading-list.component';
import {ReadingsRoutingModule} from './readings-routing-module';



@NgModule({
  declarations: [
    ReadingListComponent
  ],
  imports: [
    CommonModule,
    ReadingsRoutingModule,
  ]
})
export class ReadingsModule { }
