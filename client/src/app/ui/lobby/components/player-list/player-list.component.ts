import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Suit } from 'src/app/data/types/Suit';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerListComponent {
  @Input()
  public users: Record<string, Suit> | null = null;
}
