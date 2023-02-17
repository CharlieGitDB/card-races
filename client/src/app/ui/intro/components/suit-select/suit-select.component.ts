import { Component, inject } from '@angular/core';
import { Suit, suitList } from 'src/app/data/types/Suit';
import { IntroFacade } from '../../facades/intro.facade';

@Component({
  selector: 'app-suit-select',
  templateUrl: './suit-select.component.html',
  styleUrls: ['./suit-select.component.scss'],
})
export class SuitSelectComponent {
  private introFacade = inject(IntroFacade);

  public suit$ = this.introFacade.suit$;

  public suits: Suit[] = suitList;

  public selectSuit(suit: Suit) {
    this.introFacade.setSuit(suit);
  }
}
