import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, skip } from 'rxjs';
import { selectGameData, selectGameStats } from 'src/app/data/store/store';
import { AppState } from 'src/app/data/types/AppState';

@Injectable({
  providedIn: 'root',
})
export class GameFacade {
  private store: Store<AppState> = inject(Store);

  public stats$ = this.store.select(selectGameStats);

  public recentPick$ = this.store.select(selectGameData).pipe(
    skip(1),
    map((gameEntry) => gameEntry.recentPick)
  );
}
