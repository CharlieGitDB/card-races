import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatProgressSpinner,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { SUIT } from 'src/app/data/types/Suit';
import { MOCK_INITIAL_STORE_STATE } from 'src/app/testing/mock';
import { IntroFacade } from '../../facades/intro.facade';

import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let mockIntroCreateGame = jasmine.createSpy('createGame');
  let cdr: ChangeDetectorRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatProgressSpinnerModule],
      declarations: [CreateComponent],
      providers: [
        provideMockStore({
          initialState: MOCK_INITIAL_STORE_STATE,
        }),
        {
          provide: IntroFacade,
          useValue: {
            suit$: of(SUIT.CLUBS),
            createGame: mockIntroCreateGame,
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    cdr =
      fixture.debugElement.injector.get<ChangeDetectorRef>(ChangeDetectorRef);
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable button when loading is true', async () => {
    component.loading = true;
    cdr.detectChanges();

    const createGameButton = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;

    expect(createGameButton.disabled).toBeTrue();
  });

  it('should NOT disable button when loading is false', () => {
    component.loading = false;
    cdr.detectChanges();

    const createGameButton = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;

    expect(createGameButton.disabled).toBeFalse();
  });

  it('should show create game text in button when loading is false', () => {
    component.loading = false;
    cdr.detectChanges();

    const createGameButton = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;

    expect(createGameButton.textContent).toContain('Create Game');
  });

  it('should show spinner when loading is true', () => {
    component.loading = true;
    cdr.detectChanges();

    const matSpinner = fixture.debugElement.query(
      By.directive(MatProgressSpinner)
    );

    expect(matSpinner).toBeTruthy();
  });

  it('should call createGame when create game button is clicked', async () => {
    spyOn(component, 'createGame').and.callThrough();

    const createGameButton = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;

    createGameButton.click();
    await fixture.whenStable();

    expect(component.createGame).toHaveBeenCalled();
    expect(mockIntroCreateGame).toHaveBeenCalled();
  });
});
