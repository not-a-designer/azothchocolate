import { Component } from '@angular/core';
import { ExperienceCard } from '../experience-card/experience-card';
import { Experience } from '../../declarations/interfaces';

@Component({
  imports: [ExperienceCard],
  selector: 'azoth-experiences',
  styleUrl: './experiences.scss',
  templateUrl: './experiences.html',
})
export class Experiences {
  experiences: Experience[] = [
    {
      name: 'Cacao & Cup',
      subtitle: 'Coffee',
      modifier: 'coffee',
      description:
        'Explore how origin, fermentation, and roast meet the character of specialty coffee.',
    },
    {
      name: 'Cacao & Craft',
      subtitle: 'Beer',
      modifier: 'beer',
      description:
        'Explore chocolate alongside beer through malt, fermentation, bitterness, and aroma.',
    },
    {
      name: 'Cacao & Vine',
      subtitle: 'Wine',
      modifier: 'wine',
      description:
        'Discover how fruit, tannin, acidity, and origin connect chocolate with wine.',
    },
    {
      name: 'Cacao & Cocoa',
      subtitle: 'Chocolate',
      modifier: 'cocoa',
      description:
        'Four fine chocolates, explored through origin, craft, and distinct flavor profiles.',
    },
  ];
}
