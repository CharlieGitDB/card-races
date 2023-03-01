import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectSuit, SUIT_KEY } from 'src/app/data/store/store';
import { SUIT } from 'src/app/data/types/Suit';
import { CreateComponent } from '../../components/create/create.component';
import { JoinComponent } from '../../components/join/join.component';
import { SuitSelectComponent } from '../../components/suit-select/suit-select.component';

import { OptionsComponent } from './options.component';

describe('OptionsComponent', () => {
  let component: OptionsComponent;
  let fixture: ComponentFixture<OptionsComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
      ],
      declarations: [
        OptionsComponent,
        SuitSelectComponent,
        CreateComponent,
        JoinComponent,
      ],
      providers: [
        provideMockStore({
          initialState: {
            [SUIT_KEY]: {
              [SUIT_KEY]: null,
            },
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OptionsComponent);
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

  it('should have a p tag with uppercased Card Races text', () => {
    const p = fixture.debugElement.query(By.css('p.mat-headline-5'))
      .nativeElement as HTMLParagraphElement;
    expect(p.textContent).toContain('CARD RACES');
  });

  it('should have the suit select component', () => {
    const suitSelectComponent = fixture.debugElement.query(
      By.directive(SuitSelectComponent)
    );
    expect(suitSelectComponent).toBeTruthy();
  });

  it('should show game options when suit is selected', async () => {
    store.overrideSelector(selectSuit, null);
    store.refreshState();
    fixture.detectChanges();
    await fixture.whenRenderingDone();

    const gameOptions = fixture.debugElement.query(By.css('.game-options'))
      .nativeElement as HTMLDivElement;

    const opacity = Number(getComputedStyle(gameOptions).opacity);
    expect(opacity <= 0).toBeTruthy();
  });

  it('should show game options when suit is selected', async () => {
    store.overrideSelector(selectSuit, SUIT.CLUBS);
    store.refreshState();
    fixture.detectChanges();
    await fixture.whenRenderingDone();

    const gameOptions = fixture.debugElement.query(By.css('.game-options'))
      .nativeElement as HTMLDivElement;

    const opacity = Number(getComputedStyle(gameOptions).opacity);
    expect(opacity > 0).toBeTruthy();
  });
});
