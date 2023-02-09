import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CreateGame } from 'src/app/data/store/store';
import { AppState } from 'src/app/data/types/AppState';
import { Suit } from 'src/app/data/types/Suit';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  private store: Store<AppState> = inject(Store);

  public loading: boolean = false;

  @Input()
  public selectedSuit: Suit | null = null;

  public createGame() {
    if (this.selectedSuit === null || this.loading) {
      return;
    }

    this.loading = true;
    this.store.dispatch(CreateGame({ suit: this.selectedSuit }));
  }
}
