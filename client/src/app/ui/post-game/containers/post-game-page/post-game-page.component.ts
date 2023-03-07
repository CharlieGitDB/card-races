import { Component, inject } from '@angular/core';
import { PostGameFacade } from '../../facades/post-game.facade';

@Component({
  selector: 'app-post-game-page',
  templateUrl: './post-game-page.component.html',
  styleUrls: ['./post-game-page.component.scss'],
})
export class PostGamePageComponent {
  private postGameFacade = inject(PostGameFacade);

  public winner$ = this.postGameFacade.winner$;

  public winners$ = this.postGameFacade.winners$;
}
