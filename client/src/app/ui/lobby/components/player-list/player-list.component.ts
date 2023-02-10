import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectGameUserData } from 'src/app/data/store/store';
import { AppState } from 'src/app/data/types/AppState';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent {
  private store: Store<AppState> = inject(Store);
  public users$ = this.store.select(selectGameUserData);
}
