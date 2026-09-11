import { Component, Input } from '@angular/core';
import { Experience } from '../../declarations/interfaces';

@Component({
  selector: 'experience-card',
  styleUrl: './experience-card.scss',
  templateUrl: './experience-card.html',
})
export class ExperienceCard {
  @Input({ required: true })
  experience!: Experience;
}
