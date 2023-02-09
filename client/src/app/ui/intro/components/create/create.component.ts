import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '@services/services';
import { Suit } from 'src/app/data/types/Suit';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  private gameService = inject(GameService);
  private router = inject(Router);

  public loading: boolean = false;

  @Input()
  public selectedSuit: Suit | null = null;

  ngOnInit() {
    this.gameService.createdGame$.subscribe(() => {
      this.loading = false;
      this.router.navigate(['lobby']);
    });
  }

  public createGame() {
    if (this.selectedSuit === null || this.loading) {
      return;
    }

    this.gameService.createGame(this.selectedSuit);
    this.loading = true;
  }
}
