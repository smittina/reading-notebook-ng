import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, tap} from 'rxjs';
import {Configuration} from '../models/configuration.model';
import {environment} from '../../../environments/environment';

@Injectable()
export class ConfigurationsService {

  constructor(private http: HttpClient) {}

  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  get loading$() {
    return this._loading$.asObservable();
  }

  private setLoadingStatus(loading: boolean): void {
    this._loading$.next(loading);
  }

  private _configs$: BehaviorSubject<Configuration> = new BehaviorSubject<Configuration>({genres: [], tropes: []});

  get configs$() {
    return this._configs$.asObservable();
  }

  getConfigFromServer(): void {
    this.setLoadingStatus(true);
    this.http.get<Configuration>(`${environment.apiUrl}/config`).pipe(
      tap(configs => {
        this._configs$.next(configs);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }
}
