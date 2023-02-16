import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameStartedGuard } from './guards/game-started.guard';
import { InGameGuard } from './guards/in-game.guard';
import { GamePageComponent } from './ui/game/containers/game-page/game-page.component';
import { IntroPageComponent } from './ui/intro/containers/intro-page/intro-page.component';
import { LobbyPageComponent } from './ui/lobby/containers/lobby-page/lobby-page.component';
import { NotFoundPageComponent } from './ui/shared/containers/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    component: IntroPageComponent,
  },
  {
    path: 'lobby',
    canActivate: [InGameGuard],
    component: LobbyPageComponent,
  },
  {
    path: 'game',
    canActivate: [GameStartedGuard],
    component: GamePageComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
