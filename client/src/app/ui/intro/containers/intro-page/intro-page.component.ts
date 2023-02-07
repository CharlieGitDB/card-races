import { Component, inject, OnInit } from '@angular/core';
import { GameService, NegotiateService } from '@services/services';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.scss'],
})
export class IntroPageComponent implements OnInit {
  private negotiateService = inject(NegotiateService);
  private gameService = inject(GameService);

  async ngOnInit(): Promise<void> {
    const request$ = this.negotiateService.getConnectionInfo();
    const connectionInfo = await lastValueFrom(request$);

    this.gameService.connect(connectionInfo.url);

    this.gameService.info$.subscribe((data) => {
      console.log(data, 'from intro');
    });
  }
}
