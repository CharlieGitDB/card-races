import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '@services/services';
import { filter } from 'rxjs';
import { Suit } from 'src/app/data/types/Suit';
import { EVENT_TYPE } from '../../../../data/types/types';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  private gameService = inject(GameService);
  private router = inject(Router);

  @Input()
  public selectedSuit: Suit | null = null;

  ngOnInit() {
    this.gameService.createdGame$
      .pipe(filter((data) => data.eventType === EVENT_TYPE.CREATED))
      .subscribe(() => {
        console.log('hit!');
        this.router.navigate(['lobby']);
      });
  }

  public createGame() {
    console.log('ran create game');
    if (this.selectedSuit === null) {
      return;
    }

    this.gameService.createGame(this.selectedSuit);
  }
}
