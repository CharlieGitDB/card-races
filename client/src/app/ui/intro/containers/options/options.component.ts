import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { Suit } from 'src/app/data/types/Suit';

const SHOW_OPTIONS = trigger('showOptions', [
  state(
    'show',
    style({
      opacity: 1,
    })
  ),
  state(
    'hide',
    style({
      opacity: 0,
      transform: 'translateX(-200%)',
    })
  ),
  transition('hide => show', [
    animate(
      '300ms ease-in',
      style({
        opacity: 1,
        transform: 'translateX(0)',
      })
    ),
  ]),
]);

@Component({
  selector: 'app-options',
  animations: [SHOW_OPTIONS],
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent {
  public selectedSuit: Suit | null = null;

  public selectSuit(suit: Suit) {
    this.selectedSuit = suit;
  }
}
