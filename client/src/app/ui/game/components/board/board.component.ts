import { Component, inject } from '@angular/core';
import { GameFacade } from '../../facades/game.facade';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  private gameFacade = inject(GameFacade);

  public stats$ = this.gameFacade.stats$;
}
