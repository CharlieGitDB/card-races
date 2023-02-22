import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameService, NegotiateService } from '@services/services';
import { lastValueFrom } from 'rxjs';
import { JoinedGame, NextRound, StartedGame } from 'src/app/data/store/store';
import { SetUserContext } from 'src/app/data/store/user/user.actions';
import { AppState } from 'src/app/data/types/AppState';

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.scss'],
})
export class IntroPageComponent implements OnInit {
  private negotiateService = inject(NegotiateService);
  private gameService = inject(GameService);
  private store: Store<AppState> = inject(Store);

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
  }
}
