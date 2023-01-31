import { Component, OnInit } from '@angular/core';
import { SUIT, Suit } from 'src/app/shared/types/Suit';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public clock: any;
  public pieceToMove: Suit | null = null;
  public board: Record<Suit, number> = {
    SPADES: 10,
    HEARTS: 10,
    CLUBS: 10,
    DIAMONDS: 10,
  };

  ngOnInit() {
    this.clock = setInterval(this.tick, 1000);
  }

  public tick = () => {
    if (this.board.SPADES !== 1) {
      this.board.SPADES--;
      this.pieceToMove = SUIT.SPADES;
    } else {
      clearInterval(this.clock);
    }
  };
}
