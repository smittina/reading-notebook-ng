import {Component, inject, OnInit} from '@angular/core';
import {ReadingsService} from '../../services/readings.service';
import {Observable} from 'rxjs';
import {AllReadings} from '../../models/all-readings.model';

@Component({
  selector: 'app-reading-list',
  standalone: false,
  templateUrl: './reading-list.component.html',
  styleUrl: './reading-list.component.scss',
})
export class ReadingListComponent implements OnInit {

  private readingsService = inject(ReadingsService);

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

}
