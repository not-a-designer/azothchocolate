import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'azoth-hero',
  styleUrl: './hero.scss',
  templateUrl: './hero.html',
})
export class Hero {}
