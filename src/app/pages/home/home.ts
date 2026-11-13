import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Component, inject, OnInit } from '@angular/core';
import { About } from '../../components/about/about';
import { EducationArc } from '../../components/education-arc/education-arc';
import { Experiences } from '../../components/experiences/experiences';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Hero } from '../../components/hero/hero';
import { InquiryCta } from '../../components/inquiry-cta/inquiry-cta';
import { setCanonicalUrl } from '../../utils/canonical';

const HOME_TITLE = 'Guided Chocolate Tastings & Pairings for Venues | Azoth Chocolate';
const HOME_DESCRIPTION =
  'Follow cacao from origin to finished chocolate, compare industrial and craft chocolate, and taste four carefully selected chocolates paired with coffee, beer, wine, or on their own.';
const HOME_URL = 'https://azothchocolate.com/';
const HOME_SOCIAL_IMAGE = 'https://azothchocolate.com/images/azoth-social-share.webp';
const HOME_SOCIAL_IMAGE_ALT =
  'Guests comparing plain chocolate samples with coffee, beer, and wine at an Azoth tasting';

@Component({
  imports: [
    Header,
    Hero,
    EducationArc,
    Experiences,
    About,
    InquiryCta,
    Footer,
  ],
  selector: 'azoth-home-page',
  styles: ':host { display: block; }',
  templateUrl: './home.html',
})
export class HomePage implements OnInit {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  ngOnInit(): void {
    setCanonicalUrl(this.document, HOME_URL);
    this.title.setTitle(HOME_TITLE);
    this.meta.updateTag({ name: 'description', content: HOME_DESCRIPTION });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ property: 'og:title', content: HOME_TITLE });
    this.meta.updateTag({ property: 'og:description', content: HOME_DESCRIPTION });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: HOME_URL });
    this.meta.updateTag({ property: 'og:site_name', content: 'Azoth Chocolate' });
    this.meta.updateTag({ property: 'og:image', content: HOME_SOCIAL_IMAGE });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: HOME_SOCIAL_IMAGE_ALT });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: HOME_TITLE });
    this.meta.updateTag({ name: 'twitter:description', content: HOME_DESCRIPTION });
    this.meta.updateTag({ name: 'twitter:image', content: HOME_SOCIAL_IMAGE });
    this.meta.updateTag({ name: 'twitter:image:alt', content: HOME_SOCIAL_IMAGE_ALT });
  }
}
