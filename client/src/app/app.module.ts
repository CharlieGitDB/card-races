import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroPageComponent } from './ui/intro/containers/intro-page/intro-page.component';
import { OptionsComponent } from './ui/intro/containers/options/options.component';
import { NotFoundPageComponent } from './ui/shared/containers/not-found-page/not-found-page.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BASE_API_URL_KEY } from '@constants/constants';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import {
  GameEffects,
  gameReducer,
  GAME_KEY,
  loadingReducer,
  LOADING_KEY,
  suitReducer,
  SUIT_KEY,
} from './data/store/store';
import { userReducer } from './data/store/user/user.reducers';
import { USER_KEY } from './data/store/user/user.selectors';
import { BoardComponent } from './ui/game/components/board/board.component';
import { CardComponent } from './ui/game/components/card/card.component';
import { GamePageComponent } from './ui/game/containers/game-page/game-page.component';
import { PlayerListComponent } from './ui/lobby/components/player-list/player-list.component';
import { StartComponent } from './ui/lobby/components/start/start.component';
import { LobbyPageComponent } from './ui/lobby/containers/lobby-page/lobby-page.component';
import { CreateComponent } from './ui/setup/components/create/create.component';
import { JoinComponent } from './ui/setup/components/join/join.component';
import { SuitSelectComponent } from './ui/setup/components/suit-select/suit-select.component';
import { SetupPageComponent } from './ui/setup/containers/setup-page/setup-page.component';
import { NicknameComponent } from './ui/shared/form-controls/nickname/nickname.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    JoinComponent,
    IntroPageComponent,
    NotFoundPageComponent,
    OptionsComponent,
    LobbyPageComponent,
    PlayerListComponent,
    StartComponent,
    GamePageComponent,
    CardComponent,
    SuitSelectComponent,
    BoardComponent,
    SetupPageComponent,
    NicknameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,

    HttpClientModule,
    StoreModule.forRoot(
      {
        [USER_KEY]: userReducer,
        [SUIT_KEY]: suitReducer,
        [GAME_KEY]: gameReducer,
        [LOADING_KEY]: loadingReducer,
      },
      {}
    ),
    EffectsModule.forRoot([GameEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    {
      provide: BASE_API_URL_KEY,
      useValue: environment.functionAppUrl,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
