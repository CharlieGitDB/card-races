import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserData } from 'src/app/data/types/UserData';
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

  public get joinLocation() {
    return `${window.location.protocol}//${window.location.host}/setup/join/`;
  }

  public canStartGame(users: UserData | null): boolean {
    if (!users) {
      return false;
    }

    return 1 < Object.keys(users).length;
  }

  public startGame() {
    this.lobbyFacade.startGame();
  }
}
