import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/data/types/AppState';
import { SUIT } from 'src/app/data/types/types';
import {
  MOCK_GROUP_ID,
  MOCK_INITIAL_STORE_STATE,
  MOCK_NICKNAME,
  MOCK_USER_ID,
} from 'src/app/testing/mock';
import { LoadingButtonComponent } from 'src/app/ui/shared/components/loading-button/loading-button.component';
import { PlayerListComponent } from '../../components/player-list/player-list.component';
import { StartComponent } from '../../components/start/start.component';

import { LobbyPageComponent } from './lobby-page.component';

describe('LobbyPageComponent', () => {
  let component: LobbyPageComponent;
  let fixture: ComponentFixture<LobbyPageComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatListModule, MatTableModule, MatButtonModule],
      declarations: [
        LobbyPageComponent,
        PlayerListComponent,
        StartComponent,
        LoadingButtonComponent,
      ],
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

  it('should have app-loading-button component', () => {
    const appLoadingComponent = fixture.debugElement.query(
      By.directive(LoadingButtonComponent)
    );
    expect(appLoadingComponent).toBeTruthy();
  });

  it('should return true for lobbyPage.canStartGame when there is more than one user', () => {
    const userData = {
      [MOCK_USER_ID]: {
        id: MOCK_USER_ID,
        suit: SUIT.CLUBS,
        group: MOCK_GROUP_ID,
        nickname: MOCK_NICKNAME,
      },
      FAKEUSER2: {
        id: 'FAKEUSER2',
        suit: SUIT.DIAMONDS,
        group: MOCK_GROUP_ID,
        nickname: 'MOK',
      },
    };

    const canStartGame = component.canStartGame(userData);

    expect(canStartGame).toBeTrue();
  });

  it('should return false for lobbyPage.canStartGame when there is less than one user', () => {
    const userData = {
      [MOCK_USER_ID]: {
        id: MOCK_USER_ID,
        suit: SUIT.CLUBS,
        group: MOCK_GROUP_ID,
        nickname: MOCK_NICKNAME,
      },
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

    const loadingButton = fixture.debugElement.query(
      By.directive(LoadingButtonComponent)
    ).componentInstance;
    loadingButton.clicked.emit();

    expect(component.startGame).toHaveBeenCalled();
  });
});
