import {Component, inject, input, linkedSignal, OnInit, output} from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {ChipConfig} from '../../models/chip-config.model';


@Component({
  selector: 'app-config-item',
  standalone: false,
  templateUrl: './config-item.component.html',
  styleUrl: './config-item.component.scss',
})
export class ConfigItemComponent implements OnInit {

  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly announcer = inject(LiveAnnouncer);

  chipConfig = input.required<ChipConfig>();
  configsFromServer = input.required<string[]>();

  configs = linkedSignal(() => this.configsFromServer());

  updatedConfigs = output<string[]>();

  ngOnInit(): void {
    this.updatedConfigs.emit(this.configs());
  }

  protected add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add Config
    if (value) {
      this.configs.update(configs => {
        return [...configs, value];
      });
    }
    // Clear input value
    event.chipInput!.clear();

    this.onChangeAction()
  }

  protected remove(config: string): void {
    this.configs.update(configs => {
      const index = configs.indexOf(config);
      if (index < 0) {
        return configs;
      }
      configs.splice(index, 1);
      this.announcer.announce(`${config} a été supprimé`);
      return [...configs];
    });
    this.onChangeAction();
  }

  protected edit(config: string, event: MatChipEditedEvent): void {
    const value = event.value.trim();

    // Remove config if it has no longer name
    if (!value) {
      this.remove(config);
      return;
    }

    // Edit existing config
    this.configs.update(configs => {
      const index = configs.indexOf(config);
      if (index > 0) {
        configs[index] = value;
        this.updatedConfigs.emit(this.configs());
        return [...configs];
      }
      return configs;
    });
    this.onChangeAction();
  }

  private onChangeAction(): void {
    this.updatedConfigs.emit(this.configs());
  }

}
