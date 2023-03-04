import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { Suit, suitList } from 'src/app/data/types/Suit';
import { SetupFacade } from '../../facades/setup.facade';

@Component({
  selector: 'app-suit-select',
  templateUrl: './suit-select.component.html',
  styleUrls: ['./suit-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuitSelectComponent {
  private introFacade = inject(SetupFacade);
  private cdr = inject(ChangeDetectorRef);

  public suit$ = this.introFacade.suit$;

  public suits: Suit[] = suitList;

  public selectSuit(suit: Suit) {
    this.introFacade.setSuit(suit);
    this.cdr.detectChanges();
  }
}
