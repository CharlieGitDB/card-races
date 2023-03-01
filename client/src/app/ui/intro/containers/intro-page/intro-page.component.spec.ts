import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BASE_API_URL_KEY } from '@constants/base-api-url-key';
import { provideMockStore } from '@ngrx/store/testing';
import { CreateComponent } from '../../components/create/create.component';
import { JoinComponent } from '../../components/join/join.component';
import { SuitSelectComponent } from '../../components/suit-select/suit-select.component';
import { OptionsComponent } from '../options/options.component';

import { IntroPageComponent } from './intro-page.component';

describe('IntroPageComponent', () => {
  let component: IntroPageComponent;
  let fixture: ComponentFixture<IntroPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
      ],
      declarations: [
        IntroPageComponent,
        OptionsComponent,
        SuitSelectComponent,
        CreateComponent,
        JoinComponent,
      ],
      providers: [
        {
          provide: BASE_API_URL_KEY,
          useValue: '[MOCK BASE API URL KEY]',
        },
        provideMockStore(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IntroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has the options component', () => {
    const optionsComponent = fixture.debugElement.query(
      By.directive(OptionsComponent)
    );
    expect(optionsComponent).toBeTruthy();
  });
});
