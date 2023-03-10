import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PostGameFacade } from '../../facades/post-game.facade';

@Component({
  selector: 'app-post-game-page',
  templateUrl: './post-game-page.component.html',
  styleUrls: ['./post-game-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostGamePageComponent {
  private postGameFacade = inject(PostGameFacade);

  public isWinner$ = this.postGameFacade.isWinner$;

  public winner$ = this.postGameFacade.winner$;

  public winners$ = this.postGameFacade.winners$;

  public async replayGame() {
    await this.postGameFacade.replayGame();
  }

  public goToIntroPage() {
    this.postGameFacade.goToIntroPage();
  }
}
