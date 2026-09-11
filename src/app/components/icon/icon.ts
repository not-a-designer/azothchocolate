import { Component, input } from '@angular/core';
import { IconName } from '../../declarations/interfaces';

@Component({
  selector: 'azoth-icon',
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
})
export class Icon {
  readonly name = input.required<IconName>();
}
