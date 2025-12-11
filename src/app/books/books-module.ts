import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './components/book-list/book-list.component';
import {BooksRoutingModule} from './books-routing-module';



@NgModule({
  declarations: [
    BookListComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
  ]
})
export class BooksModule { }
