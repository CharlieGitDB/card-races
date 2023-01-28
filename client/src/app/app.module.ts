import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './intro/components/create/create.component';
import { JoinComponent } from './intro/components/join/join.component';
import { IntroPageComponent } from './intro/containers/intro-page/intro-page.component';
import { OptionsComponent } from './intro/containers/options/options.component';
import { NotFoundPageComponent } from './shared/containers/not-found-page/not-found-page.component';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CardComponent } from './game/components/card/card.component';
import { GamePageComponent } from './game/containers/game-page/game-page.component';
import { SuitSelectComponent } from './intro/components/suit-select/suit-select.component';
import { PlayerListComponent } from './lobby/components/player-list/player-list.component';
import { StartComponent } from './lobby/components/start/start.component';
import { LobbyPageComponent } from './lobby/containers/lobby-page/lobby-page.component';
import { BoardComponent } from './game/components/board/board.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
