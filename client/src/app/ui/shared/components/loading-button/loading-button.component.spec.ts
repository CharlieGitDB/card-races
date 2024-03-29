import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import {
  MatProgressSpinner,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LOADING_KEY, selectLoadingData } from 'src/app/data/store/store';

import { LoadingButtonComponent } from './loading-button.component';

describe('LoadingButtonComponent', () => {
  let component: LoadingButtonComponent;
  let fixture: ComponentFixture<LoadingButtonComponent>;
  let componentRef: ComponentRef<LoadingButtonComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatButtonModule, MatProgressSpinnerModule],
      declarations: [LoadingButtonComponent],
      providers: [
        provideMockStore({
          initialState: {
            [LOADING_KEY]: {
              [LOADING_KEY]: false,
            },
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    componentRef = fixture.componentRef;
    store = TestBed.inject(MockStore);
  });

  afterEach(() => store.resetSelectors());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be disabled when Input() disabled is true', () => {
    componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;
    expect(button.disabled).toBeTrue();
  });

  it('should NOT be disabled when Input() disabled is false', () => {
    store.overrideSelector(selectLoadingData, false);
    store.refreshState();
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;
    expect(button.disabled).toBeFalsy();
  });

  it('should show loading spinner when loading is true', () => {
    store.overrideSelector(selectLoadingData, true);
    store.refreshState();
    fixture.detectChanges();

    const matSpinner = fixture.debugElement.query(
      By.directive(MatProgressSpinner)
    );
    expect(matSpinner).toBeTruthy();
  });

  it('should emit clicked when clicked', () => {
    store.overrideSelector(selectLoadingData, false);
    store.refreshState();
    fixture.detectChanges();

    spyOn(component.clicked, 'emit');

    const button = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    expect(component.clicked.emit).toHaveBeenCalled();
  });
});
