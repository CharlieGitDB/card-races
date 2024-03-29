import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Suit } from 'src/app/data/types/Suit';
import { GameFacade } from '../../facades/game.facade';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  private gameFacade = inject(GameFacade);
  private cdr = inject(ChangeDetectorRef);

  public suit: Suit | null = null;

  public flip = false;

  ngOnInit() {
    this.gameFacade.recentPick$.subscribe((suit) => {
      if (suit) {
        this.suit = suit;
        this.flip = true;
        this.cdr.detectChanges();

        setTimeout(() => {
          this.flip = false;
          this.cdr.detectChanges();
        }, 1000);
      }
    });
  }
}
