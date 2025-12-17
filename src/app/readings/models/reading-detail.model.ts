import {StatusType} from '../enums/status-type.enum';
import {ReadingType} from '../enums/reading-type.enum';

export class ReadingDetail {
  idBook!: number;
  title!: string;
  authorName!: string;
  idAuthor!: number;
  cover= null; // TODO to process later
  synopsis!: string;
  genres!: string[];
  tropes!: string[];
  pageNumber!: number;
  saga!: boolean;
  allTomePublished!: boolean;
  numberOfTome!: number;
  status!: StatusType;
  typeOfReading!: ReadingType;
  starting!: string;
  finished!: string;
  currentPage!: number;
  rating!: number;
  quotations!: string[];
}
