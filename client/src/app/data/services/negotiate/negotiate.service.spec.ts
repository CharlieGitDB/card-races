import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BASE_API_URL_KEY } from '@constants/base-api-url-key';
import { NegotiateService } from './negotiate.service';

describe('NegotiateService', () => {
  let service: NegotiateService;
  let httpCtrl: HttpTestingController;
  let MOCK_API_URL = '[MOCK API URL]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: BASE_API_URL_KEY,
          useValue: MOCK_API_URL,
        },
      ],
    });
    service = TestBed.inject(NegotiateService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
