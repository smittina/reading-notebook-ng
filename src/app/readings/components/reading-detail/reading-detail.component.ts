import {Component, inject, OnInit} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {ReadingDetail} from '../../models/reading-detail.model';
import {ActivatedRoute} from '@angular/router';
import {ReadingsService} from '../../services/readings.service';
import {StatusType} from '../../enums/status-type.enum';

@Component({
  selector: 'app-reading-detail',
  standalone: false,
  templateUrl: './reading-detail.component.html',
  styleUrl: './reading-detail.component.scss',
})
export class ReadingDetailComponent implements OnInit {

  private readingsService = inject(ReadingsService);
  private route = inject(ActivatedRoute);

  loading$!: Observable<boolean>;
  readingDetail$!: Observable<ReadingDetail>;

  ngOnInit() {
    this.initObservables();
    this.route.params.subscribe(params => this.readingsService.getReadingDetail(params['id']));
  }

  private initObservables() {
    this.loading$ = this.readingsService.loading$;
    this.readingDetail$ = this.readingsService.readingDetail$;
  }

  protected readonly StatusType = StatusType;

  protected getRating(rating: number) {
    switch (rating) {
      case 1.0: return '⭐';
      case 2.0: return '⭐⭐';
      case 3.0: return '⭐⭐⭐';
      case 4.0: return '⭐⭐⭐⭐';
      case 5.0: return '⭐⭐⭐⭐⭐';
      case 6.0: return 'Coup de ❤️';
      default:
        console.log("rating is not supported!");
        return '';
    }
  }

  protected getReadingProgression(currentPage:number, total:number) {
    const progression = (currentPage * 100) / total;
    return progression.toString();
  }
}
