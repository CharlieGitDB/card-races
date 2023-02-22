import { Component, inject } from '@angular/core';
import { lastValueFrom, take } from 'rxjs';
import { IntroFacade } from '../../facades/intro.facade';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  private introFacade = inject(IntroFacade);

  public loading = false;

  public async createGame() {
    const suit = await lastValueFrom(this.introFacade.suit$.pipe(take(1)));

    if (suit === null || this.loading) {
      return;
    }

    this.loading = true;
    this.introFacade.createGame(suit!);
  }
}
