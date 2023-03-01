import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Suit } from 'src/app/data/types/Suit';
import { LobbyFacade } from '../../facades/lobby.facade';

@Component({
  selector: 'app-lobby-page',
  templateUrl: './lobby-page.component.html',
  styleUrls: ['./lobby-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LobbyPageComponent {
  private lobbyFacade = inject(LobbyFacade);

  public users$ = this.lobbyFacade.users$;
  public groupId$ = this.lobbyFacade.groupId$;

  public canStartGame(users: Record<string, Suit> | null): boolean {
    if (!users) {
      return false;
    }

    return 1 < Object.keys(users).length;
  }

  public startGame() {
    this.lobbyFacade.startGame();
  }
}
