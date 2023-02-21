import { Component, inject } from '@angular/core';
import { SUIT } from 'src/app/data/types/Suit';
import { GameFacade } from '../../facades/game.facade';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  private gameFacade = inject(GameFacade);

  public SUIT = SUIT;
  public stats$ = this.gameFacade.stats$;
}
