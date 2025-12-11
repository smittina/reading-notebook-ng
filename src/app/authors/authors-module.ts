import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorListComponent } from './components/author-list/author-list.component';
import {AuthorsRoutingModule} from './authors-routing-module';



@NgModule({
  declarations: [
    AuthorListComponent
  ],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
  ]
})
export class AuthorsModule { }
