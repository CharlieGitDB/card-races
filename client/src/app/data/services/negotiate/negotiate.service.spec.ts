import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BASE_API_URL_KEY } from '@constants/base-api-url-key';
import { NegotiateService } from './negotiate.service';

describe('NegotiateService', () => {
  let service: NegotiateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: BASE_API_URL_KEY,
          useValue: '[MOCK API URL]',
        },
      ],
    });
    service = TestBed.inject(NegotiateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
