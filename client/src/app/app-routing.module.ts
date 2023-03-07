import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameStartedGuard } from './guards/game-started.guard';
import { InGameGuard } from './guards/in-game.guard';
import { PostGameGuard } from './guards/post-game.guard';
import { GamePageComponent } from './ui/game/containers/game-page/game-page.component';
import { IntroPageComponent } from './ui/intro/containers/intro-page/intro-page.component';
import { LobbyPageComponent } from './ui/lobby/containers/lobby-page/lobby-page.component';
import { PostGamePageComponent } from './ui/post-game/containers/post-game-page/post-game-page.component';
import { CreateComponent } from './ui/setup/components/create/create.component';
import { JoinComponent } from './ui/setup/components/join/join.component';
import { SetupPageComponent } from './ui/setup/containers/setup-page/setup-page.component';
import { NotFoundPageComponent } from './ui/shared/containers/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    component: IntroPageComponent,
  },
  {
    path: 'setup',
    component: SetupPageComponent,
    children: [
      {
        path: 'create',
        component: CreateComponent,
      },
      {
        path: 'join',
        redirectTo: 'join/',
      },
      {
        path: 'join/:gid',
        component: JoinComponent,
      },
    ],
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
    path: 'post-game',
    canActivate: [PostGameGuard],
    component: PostGamePageComponent,
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
