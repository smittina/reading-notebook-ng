import {Component, inject, OnInit} from '@angular/core';
import {map, Observable, startWith} from 'rxjs';
import {FormInformation} from '../../models/new-reading/form-information.model';
import {ReadingsService} from '../../services/readings.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StatusType} from '../../enums/status-type.enum';
import {ReadingType} from '../../enums/reading-type.enum';

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

  mainForm!: FormGroup;
  readingInfoCtrl!: FormControl;
  genresCtrl!: FormControl;
  tropesCtrl!: FormControl;
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

  ngOnInit() {
    this.initServiceObservables();
    this.readingsService.getFormInformation();
    this.initFormControls();
    this.initMainForm();
    this.initFormObservables();
  }

  private initServiceObservables() {
    this.loading$ = this.readingsService.loading$;
    this.formInformation$ = this.readingsService.formInformation$
  }

  private initFormControls() {
    this.readingInfoCtrl = this.formBuilder.control('new-reading');

    this.genresCtrl = this.formBuilder.control('');
    this.tropesCtrl = this.formBuilder.control('');
    this.bookInfoForm = this.formBuilder.group({
      title: ['', Validators.required],
      authorName: ['', Validators.required],
      synopsis: [''],
      genres: this.genresCtrl,
      tropes: this.tropesCtrl,
      pageNumber: [''],
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
      finished: [''],
      currentPage: [''],
      rating: [''],
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

  private initFormObservables() {

    this.showNewReadingForm$ = this.readingInfoCtrl.valueChanges.pipe(
      startWith(this.readingInfoCtrl.value),
      map(readingInfo => readingInfo === 'new-reading'),
    );

    this.showReReadingForm$ = this.readingInfoCtrl.valueChanges.pipe(
      startWith(this.readingInfoCtrl.value),
      map(readingInfo => readingInfo === 're-reading'),
    );

    this.showSagaForm$ = this.sagaCtrl.valueChanges.pipe(
      startWith(this.readingInfoCtrl.value),
      map(saga => saga === 'true'),
    )
  }
}
