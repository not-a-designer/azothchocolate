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
        'Explore the relationship between cacao origin, roast, fermentation, and the nuanced character of specialty coffee.',
    },
    {
      name: 'Cacao & Craft',
      subtitle: 'Beer',
      modifier: 'beer',
      description:
        'Pair fine chocolate with thoughtfully selected beer styles while exploring malt, fermentation, bitterness, and aroma.',
    },
    {
      name: 'Cacao & Vine',
      subtitle: 'Wine',
      modifier: 'wine',
      description:
        'Discover how fruit, tannin, acidity, fermentation, and origin connect fine chocolate with carefully chosen wines.',
    },
  ];
}
