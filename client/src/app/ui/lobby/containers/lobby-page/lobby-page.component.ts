import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectGameUserData } from 'src/app/data/store/store';
import { AppState } from 'src/app/data/types/AppState';
import { Suit } from 'src/app/data/types/Suit';

@Component({
  selector: 'app-lobby-page',
  templateUrl: './lobby-page.component.html',
  styleUrls: ['./lobby-page.component.scss'],
})
export class LobbyPageComponent {
  private store: Store<AppState> = inject(Store);
  private router = inject(Router);
  public users$ = this.store.select(selectGameUserData);

  public canStartGame(users: Record<string, Suit> | null): boolean {
    if (!users) {
      return false;
    }

    return 1 < Object.keys(users).length;
  }

  public startGame() {
    this.router.navigate(['game']);
  }
}
