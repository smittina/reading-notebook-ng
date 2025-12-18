import {Route, RouterModule} from '@angular/router';
import {ReadingListComponent} from './components/reading-list/reading-list.component';
import {NgModule} from '@angular/core';
import {ReadingDetailComponent} from './components/reading-detail/reading-detail.component';
import {NewReadingComponent} from './components/new-reading/new-reading.component';

const routes: Route[] = [
  { path: 'create', component: NewReadingComponent },
  { path: ':id', component: ReadingDetailComponent },
  { path: '', component: ReadingListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadingsRoutingModule { }
