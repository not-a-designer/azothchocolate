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

  get artwork(): string {
    const artwork: Record<Experience['modifier'], string> = {
      coffee: '/assets/coffee-1.svg',
      beer: '/assets/beer-1.svg',
      wine: '/assets/wine-1.svg',
      cocoa: '/assets/cocoa-1.svg',
    };

    return artwork[this.experience.modifier];
  }
}
