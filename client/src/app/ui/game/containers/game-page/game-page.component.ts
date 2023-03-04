import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { GameFacade } from '../../facades/game.facade';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePageComponent implements OnInit {
  private gameFacade = inject(GameFacade);

  public ngOnInit(): void {
    this.gameFacade.watchForWinner$.subscribe();
  }
}
