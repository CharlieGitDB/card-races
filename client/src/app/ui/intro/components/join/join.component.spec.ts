import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { SUIT } from 'src/app/data/types/Suit';
import { MOCK_GROUP_ID } from 'src/app/testing/mock';
import { IntroFacade } from '../../facades/intro.facade';

import { JoinComponent } from './join.component';

describe('JoinComponent', () => {
  let component: JoinComponent;
  let fixture: ComponentFixture<JoinComponent>;
  let mockJoinGame = jasmine.createSpy('joinGame');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [JoinComponent],
      providers: [
        provideMockStore(),
        {
          provide: IntroFacade,
          useValue: {
            joinGame: mockJoinGame,
          },
        },
      ],
    });

    fixture = TestBed.createComponent(JoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

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
    });

    const joinGameButton = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;

    expect(joinGameButton.disabled).toBeTruthy();
  });

  it('should NOT allow clicking of the join game button when there is a suit but not a groupId value', () => {
    component.suit$ = of(SUIT.DIAMONDS);

    component.joinForm.setValue({
      groupId: null,
    });

    const joinGameButton = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;

    expect(joinGameButton.disabled).toBeTruthy();
  });

  it('should allow clicking of the join game button when there is a suit and group value', () => {
    component.suit$ = of(SUIT.DIAMONDS);

    component.joinForm.setValue({
      groupId: MOCK_GROUP_ID,
    });

    fixture.detectChanges();

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

    component.suit$ = of(SUIT.DIAMONDS);

    component.joinForm.setValue({
      groupId: MOCK_GROUP_ID,
    });

    fixture.detectChanges();

    const joinGameButton = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;
    joinGameButton.click();

    await fixture.whenStable();

    expect(component.submit).toHaveBeenCalled();
    expect(mockJoinGame).toHaveBeenCalled();
  });
});
