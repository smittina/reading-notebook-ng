import {ExistentBook} from './existent-book.model';

export class ExistentAuthor {
  id!: number;
  name!: string;
  books!: ExistentBook[];
}
