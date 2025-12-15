import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  exports: [
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
  ]
})
export class MaterialModule { }
