import { Component, inject, OnInit } from '@angular/core';
import { NegotiateService } from '@services/services';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.scss'],
})
export class IntroPageComponent implements OnInit {
  private _negotiateService = inject(NegotiateService);

  async ngOnInit(): Promise<void> {
    //fix cors on functionapp
    const request$ = this._negotiateService.getConnectionInfo();
    const connectionInfo = await lastValueFrom(request$);
    console.log(connectionInfo.accessToken, 'token');
    console.log(connectionInfo.baseUrl, 'base');
    console.log(connectionInfo.url, 'url');
  }
}
