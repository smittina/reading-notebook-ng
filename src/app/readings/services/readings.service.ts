import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, tap} from 'rxjs';
import {AllReadings} from '../models/all-readings.model';
import {environment} from '../../../environments/environment';
import {ReadingDetail} from '../models/reading-detail.model';
import {B} from '@angular/cdk/keycodes';
import {FormInformation} from '../models/new-reading/form-information.model';

@Injectable()
export class ReadingsService {

  constructor(private http: HttpClient) { }

  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  get loading$() {
    return this._loading$.asObservable();
  }

  private setLoadingStatus(loading: boolean): void {
    this._loading$.next(loading);
  }

  private _allReadings$: BehaviorSubject<AllReadings[]> = new BehaviorSubject<AllReadings[]>([]);

  get allReadings$() {
    return this._allReadings$.asObservable();
  }

  private _readingDetail$: BehaviorSubject<ReadingDetail> = new BehaviorSubject<ReadingDetail>(new ReadingDetail());

  get readingDetail$() {
    return this._readingDetail$.asObservable();
  }

  private _formInformation$: BehaviorSubject<FormInformation> = new BehaviorSubject<FormInformation>(new FormInformation());

  get formInformation$() {
    return this._formInformation$.asObservable();
  }

  getAllReadings(): void {
    this.setLoadingStatus(true);
    this.http.get<AllReadings[]>(`${environment.apiUrl}/all-readings`).pipe(
      tap(readings => {
        this._allReadings$.next(readings);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }

  getReadingDetail(id: number): void {
    this.setLoadingStatus(true);
    this.http.get<ReadingDetail>(`${environment.apiUrl}/readings/reading-detail/${id}`).pipe(
      tap(reading => {
        this._readingDetail$.next(reading);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }

  getFormInformation(): void {
    this.setLoadingStatus(true);
    this.http.get<FormInformation>(`${environment.apiUrl}/readings/form-information`).pipe(
      tap(formInformation => {
        this._formInformation$.next(formInformation);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }

}
