import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  GAME_KEY,
  selectGameWinner,
  selectGameWinners,
  selectUserIsWinner,
} from 'src/app/data/store/store';
import { USER_KEY } from 'src/app/data/store/user/user.selectors';
import { AppState } from 'src/app/data/types/AppState';
import { SUIT, suitDisplayLabels } from 'src/app/data/types/Suit';
import { UserContext } from 'src/app/data/types/UserContext';
import {
  MOCK_GROUP_ID,
  MOCK_NICKNAME,
  MOCK_USER_ID,
} from 'src/app/testing/mock';
import { LoadingButtonComponent } from 'src/app/ui/shared/components/loading-button/loading-button.component';

import { PostGamePageComponent } from './post-game-page.component';

describe('PostGamePageComponent', () => {
  let component: PostGamePageComponent;
  let fixture: ComponentFixture<PostGamePageComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatButtonModule],
      declarations: [PostGamePageComponent, LoadingButtonComponent],
      providers: [
        provideMockStore({
          initialState: {
            [USER_KEY]: {
              id: MOCK_GROUP_ID,
              group: MOCK_GROUP_ID,
              nickname: MOCK_NICKNAME,
              suit: SUIT.CLUBS,
            },
            [GAME_KEY]: {
              winner: null,
              userData: {
                [MOCK_USER_ID]: {},
                FAKEID: {},
              },
            },
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  afterEach(() => store.resetSelectors());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call replayGame when Replay button is clicked', () => {
    spyOn(component, 'replayGame');

    const loadingComponent = fixture.debugElement.queryAll(
      By.directive(LoadingButtonComponent)
    )[0];
    const replayButton = loadingComponent.query(By.css('button'))
      .nativeElement as HTMLButtonElement;
    replayButton.click();
    fixture.detectChanges();

    expect(component.replayGame).toHaveBeenCalled();
  });

  it('should call goToIntroPage when Leave button is clicked', () => {
    spyOn(component, 'goToIntroPage');

    const loadingComponent = fixture.debugElement.queryAll(
      By.directive(LoadingButtonComponent)
    )[1];
    const leaveButton = loadingComponent.query(By.css('button'))
      .nativeElement as HTMLButtonElement;
    leaveButton.click();
    fixture.detectChanges();

    expect(component.goToIntroPage).toHaveBeenCalled();
  });

  it('should show {{suit}} wins! headline when winner$ has a value', () => {
    const mockWinner = SUIT.HEARTS;
    store.overrideSelector(selectGameWinner, mockWinner);
    store.refreshState();
    fixture.detectChanges();

    const headline = fixture.debugElement.query(By.css('.mat-headline-1'))
      .nativeElement as HTMLDivElement;
    expect(headline.textContent).toContain(
      `${suitDisplayLabels[mockWinner]} wins!`
    );
  });

  it('should show you win! headline isWinner$ is true', () => {
    const mockWinner = true;
    store.overrideSelector(selectUserIsWinner, mockWinner);
    store.refreshState();
    fixture.detectChanges();

    const headline = fixture.debugElement.query(By.css('.mat-headline-2'))
      .nativeElement as HTMLDivElement;
    expect(headline.textContent).toContain('You win!');
  });

  it('should show you lose! headline isWinner$ is false', () => {
    const mockWinner = false;
    store.overrideSelector(selectUserIsWinner, mockWinner);
    store.refreshState();
    fixture.detectChanges();

    const headline = fixture.debugElement.query(By.css('.mat-headline-2'))
      .nativeElement as HTMLDivElement;
    expect(headline.textContent).toContain('You lose!');
  });

  it('should show winners when winners$ has a value', () => {
    const mockWinners: UserContext[] = [
      {
        group: MOCK_GROUP_ID,
        id: MOCK_GROUP_ID,
        nickname: MOCK_NICKNAME,
        suit: SUIT.SPADES,
      },
      {
        group: MOCK_GROUP_ID,
        id: MOCK_GROUP_ID,
        nickname: 'Nic',
        suit: SUIT.SPADES,
      },
    ];
    store.overrideSelector(selectGameWinners, mockWinners);
    store.refreshState();
    fixture.detectChanges();

    const winnerListItems = fixture.debugElement.queryAll(By.css('li'));
    for (let i = 0; i <= winnerListItems.length - 1; i++) {
      const li = winnerListItems[i].nativeElement as HTMLLIElement;
      expect(li.textContent).toContain(mockWinners[i].nickname);
    }
  });
});
