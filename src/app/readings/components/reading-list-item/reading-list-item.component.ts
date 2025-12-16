import {Component, input} from '@angular/core';
import {BookReading} from '../../models/book-reading.model';

@Component({
  selector: 'app-reading-list-item',
  standalone: false,
  templateUrl: './reading-list-item.component.html',
  styleUrl: './reading-list-item.component.scss',
})
export class ReadingListItemComponent {

  books = input.required<BookReading[]>();

}
