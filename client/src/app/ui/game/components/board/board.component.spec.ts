import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { GAME_KEY, selectGameStats } from 'src/app/data/store/store';
import { Suit, suitList } from 'src/app/data/types/Suit';
import { MOCK_GAME_ENTRY } from 'src/app/testing/mock';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent],
      providers: [
        provideMockStore({
          initialState: {
            [GAME_KEY]: MOCK_GAME_ENTRY,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  afterEach(() => store.resetSelectors());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show placeholder board when stats = null', () => {
    for (const suit of suitList) {
      const suitCardImg = getSuitImg(suit);
      expect(suitCardImg).toBeTruthy();
      expect(Number(getComputedStyle(suitCardImg).gridRowStart)).toEqual(11);
    }
  });

  it('should go to grid position based on stats$', () => {
    for (let i = 0; i <= 5; i++) {
      const mockStats: Record<Suit, number> = {
        CLUBS: getRandomPosition(),
        HEARTS: getRandomPosition(),
        SPADES: getRandomPosition(),
        DIAMONDS: getRandomPosition(),
      };

      store.overrideSelector(selectGameStats, mockStats);
      store.refreshState();
      fixture.detectChanges();

      for (const [suit, position] of Object.entries(mockStats)) {
        const suitImg = getSuitImg(suit as Suit);
        expect(suitImg).toBeTruthy();
        expect(Number(getComputedStyle(suitImg).gridRowStart)).toEqual(
          11 - position
        );
      }
    }
  });

  const getRandomPosition = () => Math.floor(Math.random() * 11);

  const getSuitImg = (suit: Suit) =>
    fixture.debugElement
      .queryAll(By.css('img'))
      .map((img) => img.nativeElement as HTMLImageElement)
      .find(
        (img) =>
          img.src.split('/assets/')[1] === `card_${suit.toLowerCase()}.svg`
      ) as HTMLImageElement;
});
