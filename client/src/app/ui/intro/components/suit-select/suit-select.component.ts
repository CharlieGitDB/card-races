import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Suit, suitList } from 'src/app/data/types/Suit';

@Component({
  selector: 'app-suit-select',
  templateUrl: './suit-select.component.html',
  styleUrls: ['./suit-select.component.scss'],
})
export class SuitSelectComponent {
  @Input()
  public selectedSuit: string | null = null;

  @Output()
  public selectSuit = new EventEmitter<Suit>();

  public suits: Suit[] = suitList;
}
