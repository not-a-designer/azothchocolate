import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'azoth-footer',
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {
  readonly year = new Date().getFullYear();
}
