import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitSelectComponent } from './suit-select.component';

describe('SuitSelectComponent', () => {
  let component: SuitSelectComponent;
  let fixture: ComponentFixture<SuitSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuitSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuitSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
