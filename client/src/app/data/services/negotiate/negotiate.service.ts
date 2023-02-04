import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { BASE_API_URL_KEY } from '@constants/constants';
import { Observable } from 'rxjs';
import { v4 } from 'uuid';
import { ConnectionInfo } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class NegotiateService {
  private _httpClient = inject(HttpClient);

  constructor(@Inject(BASE_API_URL_KEY) private baseApiUrl: string) {}

  public getConnectionInfo(): Observable<ConnectionInfo> {
    const httpParams = new HttpParams().append('username', v4());

    const request$ = this._httpClient.get<ConnectionInfo>(
      `${this.baseApiUrl}/negotiate`,
      {
        params: httpParams,
      }
    );

    return request$;
  }
}
