import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { GAME_KEY } from 'src/app/data/store/store';
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

  it('should have app card component', () => {
    const cardComponent = fixture.debugElement.query(
      By.directive(CardComponent)
    );
    expect(cardComponent).toBeTruthy();
  });
});
