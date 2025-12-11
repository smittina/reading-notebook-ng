import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  exports: [
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule,
  ]
})
export class MaterialModule { }
