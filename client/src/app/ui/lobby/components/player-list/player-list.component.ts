import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Suit } from 'src/app/data/types/Suit';
import { UserData } from 'src/app/data/types/UserData';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerListComponent {
  @Input()
  public users: UserData | null = null;

  public get columns(): string[] {
    return ['nickname', 'suit'];
  }

  public get data(): { nickname: string; suit: Suit }[] {
    if (!this.users) {
      return [];
    }

    return Object.values(this.users).map((userContext) => ({
      nickname: userContext.nickname,
      suit: userContext.suit,
    }));
  }
}
