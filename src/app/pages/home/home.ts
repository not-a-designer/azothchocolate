import { Meta, Title } from '@angular/platform-browser';
import { Component, inject, OnInit } from '@angular/core';
import { About } from '../../components/about/about';
import { Experiences } from '../../components/experiences/experiences';
import { Footer } from '../../components/footer/footer';
import { GuestExperience } from '../../components/guest-experience/guest-experience';
import { Header } from '../../components/header/header';
import { Hero } from '../../components/hero/hero';
import { InquiryCta } from '../../components/inquiry-cta/inquiry-cta';
import { Process } from '../../components/process/process';

const HOME_TITLE = 'Azoth Chocolate | Educational Chocolate Tasting Experiences';
const HOME_DESCRIPTION =
  'Approachable, educational fine-chocolate tastings, from focused four-sample cacao explorations to pairings with coffee, beer, and wine.';

@Component({
  imports: [Header, Hero, Experiences, GuestExperience, Process, About, InquiryCta, Footer],
  selector: 'azoth-home-page',
  styles: ':host { display: block; }',
  templateUrl: './home.html',
})
export class HomePage implements OnInit {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  ngOnInit(): void {
    this.title.setTitle(HOME_TITLE);
    this.meta.updateTag({ name: 'description', content: HOME_DESCRIPTION });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ property: 'og:title', content: HOME_TITLE });
    this.meta.updateTag({ property: 'og:description', content: HOME_DESCRIPTION });
  }
}
