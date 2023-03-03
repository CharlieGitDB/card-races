import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
}
