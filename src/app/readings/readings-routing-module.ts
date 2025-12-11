import {Route, RouterModule} from '@angular/router';
import {ReadingListComponent} from './components/reading-list/reading-list.component';
import {NgModule} from '@angular/core';

const routes: Route[] = [
  { path: '', component: ReadingListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadingsRoutingModule { }
