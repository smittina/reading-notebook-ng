import {Component, inject, input, OnInit, signal} from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Config} from '../../models/config.model';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {ChipConfig} from '../../models/chip-config.model';


@Component({
  selector: 'app-config-item',
  standalone: false,
  templateUrl: './config-item.component.html',
  styleUrl: './config-item.component.scss',
})
export class ConfigItemComponent {

  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly announcer = inject(LiveAnnouncer);

  chipConfig = input.required<ChipConfig>();

  configs = signal<Config[]>([]);

  protected add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add Genre
    if (value) {
      this.configs.update(configs => [...configs, {name: value}]);
    }
    // Clear input value
    event.chipInput!.clear();
  }

  protected remove(config: Config): void {
    this.configs.update(configs => {
      const index = configs.indexOf(config);
      if (index < 0) {
        return configs;
      }
      configs.splice(index, 1);
      this.announcer.announce(`${config.name} a été supprimé`);
      return [...configs];
    });
  }

  protected edit(config: Config, event: MatChipEditedEvent): void {
    const value = event.value.trim();

    // Remove genre if he has no longer name
    if (!value) {
      this.remove(config);
      return;
    }

    // Edit existing genre
    this.configs.update(configs => {
      const index = configs.indexOf(config);
      if (index > 0) {
        configs[index].name = value;
        return [...configs];
      }
      return configs;
    });
  }

}
