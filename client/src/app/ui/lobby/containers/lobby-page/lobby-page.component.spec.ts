import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/data/types/AppState';
import { SUIT } from 'src/app/data/types/types';
import {
  MOCK_GROUP_ID,
  MOCK_INITIAL_STORE_STATE,
  MOCK_USER_ID,
} from 'src/app/testing/mock';
import { PlayerListComponent } from '../../components/player-list/player-list.component';
import { StartComponent } from '../../components/start/start.component';

import { LobbyPageComponent } from './lobby-page.component';

describe('LobbyPageComponent', () => {
  let component: LobbyPageComponent;
  let fixture: ComponentFixture<LobbyPageComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatListModule],
      declarations: [LobbyPageComponent, PlayerListComponent, StartComponent],
      providers: [
        provideMockStore<AppState>({
          initialState: MOCK_INITIAL_STORE_STATE,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LobbyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show group id headline when there is a group id in the store', () => {
    const matHeadline = fixture.debugElement.query(
      By.css('.mat-headline-5')
    ).nativeElement;

    expect(matHeadline.textContent).toContain(MOCK_GROUP_ID);
  });

  it('should have app-player-list component', () => {
    const playListComponent = fixture.debugElement.query(
      By.directive(PlayerListComponent)
    );
    expect(playListComponent).toBeTruthy();
  });

  it('should have app-start component', () => {
    const playListComponent = fixture.debugElement.query(
      By.directive(StartComponent)
    );
    expect(playListComponent).toBeTruthy();
  });

  it('should return true for lobbyPage.canStartGame when there is more than one user', () => {
    const userData = {
      [MOCK_USER_ID]: SUIT.CLUBS,
      FAKEUSER2: SUIT.DIAMONDS,
    };

    const canStartGame = component.canStartGame(userData);

    expect(canStartGame).toBeTrue();
    expect(false).toBeTrue();
  });

  it('should return false for lobbyPage.canStartGame when there is less than one user', () => {
    const userData = {
      [MOCK_USER_ID]: SUIT.CLUBS,
    };

    const canStartGame = component.canStartGame(userData);

    expect(canStartGame).toBeFalse();
  });

  it('should return false for lobbyPage.canStartGame when there are no users at all', () => {
    const canStartGame = component.canStartGame(null);

    expect(canStartGame).toBeFalse();
  });

  it('should call lobbyFacade.startGame when lobbyPage.startGame is ran', () => {
    component.startGame = jasmine.createSpy('startGame');

    const startComponent = fixture.debugElement.query(
      By.directive(StartComponent)
    ).componentInstance;
    startComponent.startGame.emit();

    expect(component.startGame).toHaveBeenCalled();
  });
});
