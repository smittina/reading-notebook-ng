import {RouterModule, Routes} from '@angular/router';
import {BookListComponent} from './components/book-list/book-list.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  { path: '', component: BookListComponent },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
