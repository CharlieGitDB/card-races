import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

import { ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { GAME_KEY, selectGameData } from 'src/app/data/store/store';
import { suitList } from 'src/app/data/types/Suit';
import { MOCK_GAME_ENTRY } from 'src/app/testing/mock';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let cdr: ChangeDetectorRef;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      providers: [
        provideMockStore({
          initialState: {
            [GAME_KEY]: MOCK_GAME_ENTRY,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    cdr =
      fixture.debugElement.injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    store = TestBed.inject(MockStore);
  });

  afterEach(() => store.resetSelectors());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have card back img', () => {
    const cardBackImg = fixture.debugElement
      .queryAll(By.css('img'))
      .map((img) => img.nativeElement as HTMLImageElement)
      .find((img) => img.src.split('/assets/')[1] === 'card_back.svg');
    expect(cardBackImg).toBeTruthy();
  });

  it('should have class flip when component.flip is true', async () => {
    component.flip = true;
    fixture.detectChanges();
    cdr.detectChanges();
    const cardDiv = fixture.debugElement.query(By.css('.card.flip'));
    expect(cardDiv).toBeTruthy();
  });

  it('should have suit card img when component.suit is selected', async () => {
    for (const suit of suitList) {
      component.suit = suit;
      fixture.detectChanges();
      cdr.detectChanges();

      const cardFaceImg = fixture.debugElement
        .queryAll(By.css('img'))
        .map((img) => img.nativeElement as HTMLImageElement)
        .find(
          (img) =>
            img.src.split('/assets/')[1] === `card_${suit.toLowerCase()}.svg`
        );

      expect(cardFaceImg).toBeTruthy();
    }
  });

  it('should flip then unflip the card when gameFacade.recentPick$ emits a value', async () => {
    for (const suit of suitList) {
      store.overrideSelector(selectGameData, {
        ...MOCK_GAME_ENTRY,
        recentPick: suit,
      });
      store.refreshState();
      fixture.detectChanges();
      await fixture.whenRenderingDone();

      expect(component.suit).toEqual(suit);
      expect(component.flip).toEqual(true);

      await waitForFlip();

      expect(component.flip).toEqual(false);
    }
  });

  const waitForFlip = async () =>
    new Promise((res) => setTimeout(() => res(true), 1200));
});
