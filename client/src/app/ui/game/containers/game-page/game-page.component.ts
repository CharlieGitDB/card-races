import { Component, inject } from '@angular/core';
import { GameFacade } from '../../facades/game.facade';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent {
  private gameFacade = inject(GameFacade);

  public winner$ = this.gameFacade.winner$;
  public isWinner$ = this.gameFacade.isWinner$;
}
