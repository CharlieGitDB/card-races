import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectSuit, SUIT_KEY } from 'src/app/data/store/store';
import { SUIT } from 'src/app/data/types/Suit';
import {
  MOCK_ACTIVATED_ROUTE,
  MOCK_GROUP_ID,
  MOCK_NICKNAME,
} from 'src/app/testing/mock';
import { NicknameComponent } from 'src/app/ui/shared/form-controls/nickname/nickname.component';

import { JoinComponent } from './join.component';

describe('JoinComponent', () => {
  let component: JoinComponent;
  let fixture: ComponentFixture<JoinComponent>;
  let mockJoinGame = jasmine.createSpy('joinGame');
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [JoinComponent, NicknameComponent],
      providers: [
        provideMockStore({
          initialState: {
            [SUIT_KEY]: {
              [SUIT_KEY]: null,
            },
          },
        }),
        MOCK_ACTIVATED_ROUTE,
      ],
    });

    fixture = TestBed.createComponent(JoinComponent);
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

  it('should NOT allow clicking of the join game button when there is a suit but not a groupId value and not a suit', () => {
    const joinGameButton = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;

    expect(joinGameButton.disabled).toBeTruthy();
  });

  it('should NOT allow clicking of the join game button when there is a groupId value but there isnt a suit', () => {
    component.joinForm.setValue({
      groupId: MOCK_GROUP_ID,
      nickname: MOCK_NICKNAME,
    });

    const joinGameButton = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;

    expect(joinGameButton.disabled).toBeTruthy();
  });

  it('should NOT allow clicking of the join game button when there is a suit but not a groupId value', () => {
    store.overrideSelector(selectSuit, SUIT.DIAMONDS);
    store.refreshState();

    component.joinForm.setValue({
      groupId: null,
      nickname: null,
    });

    const joinGameButton = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;

    expect(joinGameButton.disabled).toBeTruthy();
  });

  it('should allow clicking of the join game button when there is a suit and group value', async () => {
    store.overrideSelector(selectSuit, SUIT.DIAMONDS);
    store.refreshState();

    component.joinForm.setValue({
      groupId: MOCK_GROUP_ID,
      nickname: MOCK_NICKNAME,
    });

    fixture.detectChanges();
    await fixture.whenStable();

    const joinGameButton = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;

    expect(joinGameButton.disabled).toBeFalsy();
    expect(joinGameButton.textContent).toContain('Join Game');
  });

  it('should disable join button when loading is true', async () => {
    component.loading = true;
    fixture.detectChanges();
    await fixture.whenStable();

    const joinGameButton = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;

    expect(joinGameButton.disabled).toBeTruthy();
  });

  it('should call submit when join game is clicked', async () => {
    spyOn(component, 'submit').and.callThrough();
    spyOn((component as any).setupFacade, 'joinGame').and.callThrough();

    store.overrideSelector(selectSuit, SUIT.DIAMONDS);
    store.refreshState();

    component.joinForm.setValue({
      groupId: MOCK_GROUP_ID,
      nickname: MOCK_NICKNAME,
    });

    fixture.detectChanges();

    const joinGameButton = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;
    joinGameButton.click();

    await fixture.whenStable();
    await fixture.whenRenderingDone();

    expect(component.submit).toHaveBeenCalled();
    expect((component as any).setupFacade.joinGame).toHaveBeenCalled();
  });
});
