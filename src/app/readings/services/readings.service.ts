import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, tap} from 'rxjs';
import {AllReadings} from '../models/all-readings.model';
import {environment} from '../../../environments/environment';

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

  getAllReadings(): void {
    this.setLoadingStatus(true);
    this.http.get<AllReadings[]>(`${environment.apiUrl}/all-readings`).pipe(
      tap(readings => {
        this._allReadings$.next(readings);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }
}
