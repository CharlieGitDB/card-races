import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { lastValueFrom, take } from 'rxjs';
import {
  ReplayGame,
  selectGameGroupId,
  selectGameWinner,
  selectGameWinners,
  selectUserIsWinner,
} from 'src/app/data/store/store';
import { AppState } from 'src/app/data/types/AppState';

@Injectable({
  providedIn: 'root',
})
export class PostGameFacade {
  private store: Store<AppState> = inject(Store);
  private router = inject(Router);

  public isWinner$ = this.store.select(selectUserIsWinner);
  public winner$ = this.store.select(selectGameWinner);
  public winners$ = this.store.select(selectGameWinners);

  public async replayGame() {
    const group = await lastValueFrom(
      this.store.select(selectGameGroupId).pipe(take(1))
    );
    this.store.dispatch(ReplayGame({ group }));
  }

  public goToIntroPage() {
    this.router.navigate(['/']);
  }
}
