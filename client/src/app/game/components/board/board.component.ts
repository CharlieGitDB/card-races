import { Component, OnInit } from '@angular/core';
import { Suit } from 'src/app/shared/types/Suit';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public clock: any;
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
    } else {
      clearInterval(this.clock);
    }
  };
}
