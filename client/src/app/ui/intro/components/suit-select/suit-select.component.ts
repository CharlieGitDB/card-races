import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { Suit, suitList } from 'src/app/data/types/Suit';

@Component({
  selector: 'app-suit-select',
  templateUrl: './suit-select.component.html',
  styleUrls: ['./suit-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuitSelectComponent {
  private setupFacade = inject(SetupFacade);
  private cdr = inject(ChangeDetectorRef);

  public suit$ = this.setupFacade.suit$;

  public suits: Suit[] = suitList;

  public selectSuit(suit: Suit) {
    this.setupFacade.setSuit(suit);
    this.cdr.detectChanges();
  }
}
