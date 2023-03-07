import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { PostGameFacade } from '../../facades/post-game.facade';

@Component({
  selector: 'app-post-game-page',
  templateUrl: './post-game-page.component.html',
  styleUrls: ['./post-game-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostGamePageComponent {
  private postGameFacade = inject(PostGameFacade);
  private cdr = inject(ChangeDetectorRef);

  public isWinner$ = this.postGameFacade.isWinner$;

  public winner$ = this.postGameFacade.winner$;

  public winners$ = this.postGameFacade.winners$;

  public loading = false;

  public async replayGame() {
    this.loading = true;
    this.cdr.detectChanges();
    await this.postGameFacade.replayGame();
  }

  public goToIntroPage() {
    this.postGameFacade.goToIntroPage();
  }
}
