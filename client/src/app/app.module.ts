import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './ui/intro/components/create/create.component';
import { JoinComponent } from './ui/intro/components/join/join.component';
import { IntroPageComponent } from './ui/intro/containers/intro-page/intro-page.component';
import { OptionsComponent } from './ui/intro/containers/options/options.component';
import { NotFoundPageComponent } from './ui/shared/containers/not-found-page/not-found-page.component';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BoardComponent } from './ui/game/components/board/board.component';
import { CardComponent } from './ui/game/components/card/card.component';
import { GamePageComponent } from './ui/game/containers/game-page/game-page.component';
import { SuitSelectComponent } from './ui/intro/components/suit-select/suit-select.component';
import { PlayerListComponent } from './ui/lobby/components/player-list/player-list.component';
import { StartComponent } from './ui/lobby/components/start/start.component';
import { LobbyPageComponent } from './ui/lobby/containers/lobby-page/lobby-page.component';

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
