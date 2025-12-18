import {Component, inject, OnInit} from '@angular/core';
import {ReadingsService} from '../../services/readings.service';
import {Observable} from 'rxjs';
import {AllReadings} from '../../models/all-readings.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reading-list',
  standalone: false,
  templateUrl: './reading-list.component.html',
  styleUrl: './reading-list.component.scss',
})
export class ReadingListComponent implements OnInit {

  private readingsService = inject(ReadingsService);
  private router = inject(Router);

  loading$!: Observable<boolean>;
  allReadings$!: Observable<AllReadings[]>;

  ngOnInit(): void {
    this.initObservables();
    this.readingsService.getAllReadings();
  }

  private initObservables(): void {
    this.loading$ = this.readingsService.loading$;
    this.allReadings$ = this.readingsService.allReadings$;
  }

  protected onAddNewReading() {
      this.router.navigateByUrl('/readings/create');
  }
}
