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
      title: 'Discover',
      icon: 'consult',
      description: 'Discuss the venue, audience, products, service format, and goals.',
    },
    {
      number: '02',
      title: 'Design',
      icon: 'develop',
      description:
        'Select the tasting format and four chocolates, with beverage collaboration where applicable.',
    },
    {
      number: '03',
      title: 'Plan',
      icon: 'source',
      description:
        'Agree on timing, guest count, promotion, ticketing, and service responsibilities.',
    },
    {
      number: '04',
      title: 'Host',
      icon: 'host',
      description:
        'Azoth sources the chocolate and leads the experience while your venue supports the agreed service plan.',
    },
  ];
}
