import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Suit } from 'src/app/shared/types/Suit';

@Component({
  selector: 'app-options',
  animations: [
    trigger('showOptions', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-200%)',
        }),
        animate(
          '300ms ease-in',
          style({
            opacity: 1,
            transform: 'translateX(0)',
          })
        ),
      ]),
    ]),
  ],
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent {
  public selectedSuit: Suit | null = null;

  public selectSuit(suit: Suit) {
    this.selectedSuit = suit;
  }
}
