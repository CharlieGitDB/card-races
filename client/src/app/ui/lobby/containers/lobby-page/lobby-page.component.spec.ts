import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  selectGameGroupId,
  selectGameUserData,
} from 'src/app/data/store/store';
import { AppState } from 'src/app/data/types/AppState';
import { SUIT } from 'src/app/data/types/types';
import { PlayerListComponent } from '../../components/player-list/player-list.component';
import { StartComponent } from '../../components/start/start.component';

import { LobbyPageComponent } from './lobby-page.component';

describe('LobbyPageComponent', () => {
  let component: LobbyPageComponent;
  let fixture: ComponentFixture<LobbyPageComponent>;
  let store: MockStore<AppState>;

  let MOCK_GROUP_ID = 'mockgroupid';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatListModule],
      declarations: [LobbyPageComponent, PlayerListComponent, StartComponent],
      providers: [
        provideMockStore<AppState>({
          selectors: [
            {
              selector: selectGameGroupId,
              value: MOCK_GROUP_ID,
            },
            {
              selector: selectGameUserData,
              value: [
                {
                  fakeid: SUIT.CLUBS,
                },
              ],
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LobbyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

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
});
