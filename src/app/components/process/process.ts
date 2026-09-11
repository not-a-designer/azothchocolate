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
      description: 'We taste together and select chocolates that complement your beverages.',
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
      description: 'Your venue serves its beverages while Azoth leads the guided experience.',
    },
  ];
}
