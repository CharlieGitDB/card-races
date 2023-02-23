import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { SuitSelectComponent } from './suit-select.component';

describe('SuitSelectComponent', () => {
  let component: SuitSelectComponent;
  let fixture: ComponentFixture<SuitSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuitSelectComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(SuitSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
