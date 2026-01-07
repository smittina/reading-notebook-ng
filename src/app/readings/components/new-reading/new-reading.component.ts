import {Component, inject, OnInit} from '@angular/core';
import {distinctUntilChanged, map, Observable, of, startWith, switchMap, tap} from 'rxjs';
import {FormInformation} from '../../models/new-reading/form-information.model';
import {ReadingsService} from '../../services/readings.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StatusType} from '../../enums/status-type.enum';
import {ReadingType} from '../../enums/reading-type.enum';
import {ExistentBook} from '../../models/new-reading/existent-book.model';

@Component({
  selector: 'app-new-reading',
  standalone: false,
  templateUrl: './new-reading.component.html',
  styleUrl: './new-reading.component.scss',
})
export class NewReadingComponent implements OnInit {

  protected readonly StatusType = StatusType;
  protected readonly ReadingType = ReadingType;

  readingsService = inject(ReadingsService);
  formBuilder = inject(FormBuilder);

  loading$!: Observable<boolean>;
  formInformation$!: Observable<FormInformation>;
  books$!: Observable<ExistentBook[]>;
  books!: ExistentBook[];

  mainForm!: FormGroup;
  readingInfoCtrl!: FormControl;
  genresCtrl!: FormControl;
  tropesCtrl!: FormControl;
  existentAuthorCtrl!: FormControl;
  existentBookCtrl!: FormControl;
  bookInfoForm!: FormGroup;
  sagaInfoForm!: FormGroup;
  sagaCtrl!: FormControl;
  allTomePublishedCtrl!: FormControl;
  readingInfoForm!: FormGroup;
  statusCtrl!: FormControl;
  typeOfReadingCtrl!: FormControl;

  showNewReadingForm$!: Observable<boolean>;
  showReReadingForm$!: Observable<boolean>;
  showSagaForm$!: Observable<boolean>;
  showFinishedBookForm$!: Observable<boolean>;


  ngOnInit() {
    this.initServiceObservables();
    this.readingsService.getFormInformation();
    this.initFormControls();
    this.initMainForm();
    this.initFormObservables();
  }

  private initServiceObservables(): void {
    this.loading$ = this.readingsService.loading$;
    this.formInformation$ = this.readingsService.formInformation$;
  }

  private initFormControls(): void {
    this.readingInfoCtrl = this.formBuilder.control('new-reading');

    this.genresCtrl = this.formBuilder.control('');
    this.tropesCtrl = this.formBuilder.control('');
    this.existentAuthorCtrl = this.formBuilder.control('');
    this.existentBookCtrl = this.formBuilder.control('');
    this.bookInfoForm = this.formBuilder.group({
      title: ['', Validators.required],
      authorName: ['', Validators.required],
      existentAuthor: this.existentAuthorCtrl,
      existentBook: this.existentBookCtrl,
      synopsis: [''],
      genres: this.genresCtrl,
      tropes: this.tropesCtrl,
      pageNumber: ['0'],
    });

    this.sagaCtrl = this.formBuilder.control('false', Validators.required);
    this.allTomePublishedCtrl = this.formBuilder.control('false', Validators.required);
    this.sagaInfoForm = this.formBuilder.group({
      saga: this.sagaCtrl,
      allTomePublished: this.allTomePublishedCtrl,
      numberOfTome: ['0'],
    });

    this.statusCtrl = this.formBuilder.control(StatusType.IN_PROGRESS);
    this.typeOfReadingCtrl = this.formBuilder.control(ReadingType.PAPERBACK);
    this.readingInfoForm = this.formBuilder.group({
      typeOfReading: this.typeOfReadingCtrl,
      status: this.statusCtrl,
      starting: ['', Validators.required],
      finished: ['', Validators.required],
      currentPage: ['0'],
      rating: ['-1'],
    })
  }

  private initMainForm(): void {
    this.mainForm = this.formBuilder.group({
      readingInfo: this.readingInfoCtrl,
      bookInfo: this.bookInfoForm,
      sagaInfo: this.sagaInfoForm,
      reading: this.readingInfoForm,
    })
  }

  private initFormObservables(): void {
    this.existentAuthorCtrl.valueChanges.pipe(
      startWith(this.existentAuthorCtrl.value),
      switchMap(authorId => {
        this.existentBookCtrl.reset();
        if(!authorId) {
          return of ([]);
        } else {
          return this.readingsService.getBooksFromAuthorId(authorId);
        }
      })
    ).subscribe(book => this.books = book);

    this.showNewReadingForm$ = this.readingInfoCtrl.valueChanges.pipe(
      startWith(this.readingInfoCtrl.value),
      map(readingInfo => readingInfo === 'new-reading'),
    );

    this.showReReadingForm$ = this.readingInfoCtrl.valueChanges.pipe(
      startWith(this.readingInfoCtrl.value),
      map(readingInfo => readingInfo === 're-reading'),
    );

    this.showSagaForm$ = this.sagaCtrl.valueChanges.pipe(
      startWith(this.sagaCtrl.value),
      map(saga => saga === 'true'),
    );

    this.showFinishedBookForm$ = this.statusCtrl.valueChanges.pipe(
      startWith(this.statusCtrl.value),
      map(status => status === StatusType.FINISHED)
    );
  }

  protected getSliderLabel(value: number): string {
    if (value === 5.5) {
      return 'Coup de ❤️';
    }
    return `${value} ⭐`;
  }

  protected onSubmit() {
    console.log(this.mainForm.value);
  }
}
