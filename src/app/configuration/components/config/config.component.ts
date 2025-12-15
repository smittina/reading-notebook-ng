import {Component, inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Configuration} from '../../models/configuration.model';
import {ConfigurationsService} from '../../services/configurations.service';

@Component({
  selector: 'app-config',
  standalone: false,
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss',
})
export class ConfigComponent implements OnInit {

  private configurationsService = inject(ConfigurationsService);
  loading$!: Observable<boolean>;
  configuration$!: Observable<Configuration>;

  updatedGenres!: string[];
  updatedTropes!: string[];

  ngOnInit() {
    this.initObservables();
    this.configurationsService.getConfigFromServer();
  }

  private initObservables(): void {
    this.loading$ = this.configurationsService.loading$;
    this.configuration$ = this.configurationsService.configs$;
  }

  protected onSaveConfiguration() {
    this.configurationsService.updateConfigs({genres: this.updatedGenres, tropes: this.updatedTropes});
  }

  protected onSaveGenres(genres: string[]) {
    this.updatedGenres = [...genres];
  }

  protected onSaveTropes(tropes: string[]) {
    this.updatedTropes = [...tropes];
  }
}
