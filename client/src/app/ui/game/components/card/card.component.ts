import { Component } from '@angular/core';
import { SUIT } from 'src/app/data/types/Suit';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  public SUIT: typeof SUIT = SUIT;

  public flip = false;

  flipIt() {
    this.flip = !this.flip;
  }
}
