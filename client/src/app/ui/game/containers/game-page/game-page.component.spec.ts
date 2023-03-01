import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  GAME_KEY,
  selectGameWinner,
  selectUserIsWinner,
} from 'src/app/data/store/store';
import { SUIT } from 'src/app/data/types/Suit';
import { MOCK_GAME_ENTRY } from 'src/app/testing/mock';
import { BoardComponent } from '../../components/board/board.component';
import { CardComponent } from '../../components/card/card.component';

import { GamePageComponent } from './game-page.component';

describe('GamePageComponent', () => {
  let component: GamePageComponent;
  let fixture: ComponentFixture<GamePageComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamePageComponent, BoardComponent, CardComponent],
      providers: [
        provideMockStore({
          initialState: {
            [GAME_KEY]: MOCK_GAME_ENTRY,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  afterEach(() => {
    fixture.destroy();
    store.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have app board component', () => {
    const boardComponent = fixture.debugElement.query(
      By.directive(BoardComponent)
    );
    expect(boardComponent).toBeTruthy();
  });

  it('should not have headline when there is not a winner$', async () => {
    store.overrideSelector(selectGameWinner, null);
    store.refreshState();
    await waitForUi();

    const outcomeHeadline = fixture.debugElement.query(
      By.css('.actions p.mat-headline-4')
    );
    expect(outcomeHeadline).toBeFalsy();
  });

  it('should have game outcome if there is a winner$', async () => {
    store.overrideSelector(selectGameWinner, SUIT.DIAMONDS);
    store.overrideSelector(selectUserIsWinner, false);
    store.refreshState();
    await waitForUi();

    const outcomeHeadline = fixture.debugElement.query(
      By.css('.actions p.mat-headline-4')
    );
    expect(outcomeHeadline).toBeTruthy();
  });

  it('should show YOU LOSE! when isWinner$ is false', async () => {
    store.overrideSelector(selectGameWinner, SUIT.DIAMONDS);
    store.overrideSelector(selectUserIsWinner, false);
    store.refreshState();
    await waitForUi();

    const outcomeHeadline = fixture.debugElement.query(
      By.css('.actions p.mat-headline-4')
    ).nativeElement as HTMLParagraphElement;
    expect(outcomeHeadline.textContent).toContain('YOU LOSE!');
  });

  it('should show YOU WIN! when isWinner$ is true', async () => {
    store.overrideSelector(selectGameWinner, SUIT.DIAMONDS);
    store.overrideSelector(selectUserIsWinner, true);
    store.refreshState();
    await waitForUi();

    const outcomeHeadline = fixture.debugElement.query(
      By.css('.actions p.mat-headline-4')
    ).nativeElement as HTMLParagraphElement;
    expect(outcomeHeadline.textContent).toContain('YOU WIN!');
  });

  it('should show CardComponent when there is NOT a winner$', async () => {
    store.overrideSelector(selectGameWinner, null);
    store.overrideSelector(selectUserIsWinner, false);
    store.refreshState();
    await waitForUi();
    const cardComponent = fixture.debugElement.query(
      By.directive(CardComponent)
    );
    expect(cardComponent).toBeTruthy();
  });

  it('should NOT show CardComponent when there is a winner$', async () => {
    store.overrideSelector(selectGameWinner, SUIT.DIAMONDS);
    store.overrideSelector(selectUserIsWinner, false);
    store.refreshState();
    await waitForUi();
    const cardComponent = fixture.debugElement.query(
      By.directive(CardComponent)
    );
    expect(cardComponent).toBeFalsy();
  });

  const waitForUi = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
  };
});
