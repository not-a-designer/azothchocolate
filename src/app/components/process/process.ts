import { Component } from '@angular/core';
import { ProcessStep } from '../../declarations/interfaces';
import { Icon } from '../icon/icon';

@Component({
  imports: [Icon],
  selector: 'azoth-process',
  styleUrl: './process.scss',
  templateUrl: './process.html',
})
export class Process {
  steps: ProcessStep[] = [
    {
      number: '01',
      title: 'Consult',
      icon: 'consult',
      description: 'We discuss your venue, products, audience, event format, and goals.',
    },
    {
      number: '02',
      title: 'Develop',
      icon: 'develop',
      description:
        'We shape the tasting and select four fine chocolates, with beverage collaboration where applicable.',
    },
    {
      number: '03',
      title: 'Source',
      icon: 'source',
      description: 'Azoth sources the fine chocolate selected specifically for your event.',
    },
    {
      number: '04',
      title: 'Host',
      icon: 'host',
      description:
        'Azoth leads the guided experience while your venue supports the agreed service format.',
    },
  ];
}
