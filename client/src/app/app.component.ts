import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { GameService, NegotiateService } from '@services/services';
import { lastValueFrom } from 'rxjs';
import {
  JoinedGame,
  NextRound,
  RestartedGame,
  StartedGame,
} from './data/store/store';
import { SetUserContext } from './data/store/user/user.actions';
import { AppState } from './data/types/AppState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private negotiateService = inject(NegotiateService);
  private gameService = inject(GameService);
  private store: Store<AppState> = inject(Store);
  private snackBar = inject(MatSnackBar);
  private FIVE_SECONDS = 5000;

  async ngOnInit(): Promise<void> {
    const request$ = this.negotiateService.getConnectionInfo();
    const connectionInfo = await lastValueFrom(request$);

    this.gameService.connect(connectionInfo.url);

    this.gameService.userScope$.subscribe((res) => {
      if (typeof res.data === 'string') {
        console.log('[USER]', res);
      } else {
        this.store.dispatch(SetUserContext({ userContext: res.data }));
      }
    });

    this.gameService.joinedGame$.subscribe((res) =>
      this.store.dispatch(JoinedGame({ gameData: res.data }))
    );

    this.gameService.startedGame$.subscribe((res) =>
      this.store.dispatch(StartedGame({ gameData: res.data }))
    );

    this.gameService.nextRound$.subscribe((res) =>
      this.store.dispatch(NextRound({ gameData: res.data }))
    );

    this.gameService.restartedGame$.subscribe((res) =>
      this.store.dispatch(RestartedGame({ gameData: res.data }))
    );

    this.gameService.errors$.subscribe((res) =>
      this.snackBar.open(res.data, 'OK', {
        duration: this.FIVE_SECONDS,
      })
    );
  }
}
