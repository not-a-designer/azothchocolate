import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { Experiences } from './components/experiences/experiences';
import { GuestExperience } from './components/guest-experience/guest-experience';
import { Process } from './components/process/process';
import { About } from './components/about/about';
import { InquiryCta } from './components/inquiry-cta/inquiry-cta';
import { Footer } from './components/footer/footer';

@Component({
  imports: [Header, Hero, Experiences, GuestExperience, Process, About, InquiryCta, Footer],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
