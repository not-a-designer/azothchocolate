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
        'Taste how cacao origin, fermentation, and roast meet the nuanced character of specialty coffee.',
    },
    {
      name: 'Cacao & Craft',
      subtitle: 'Beer',
      modifier: 'beer',
      description:
        'Explore fine chocolate alongside beer through malt, fermentation, bitterness, and aroma.',
    },
    {
      name: 'Cacao & Vine',
      subtitle: 'Wine',
      modifier: 'wine',
      description:
        'Discover how fruit, tannin, acidity, fermentation, and origin connect chocolate and wine.',
    },
    {
      name: 'Cacao & Cocoa',
      subtitle: 'Chocolate',
      modifier: 'cocoa',
      description:
        'Taste four fine chocolates while exploring cacao history, origin, craft production, and flavor - no beverage required.',
    },
  ];
}
