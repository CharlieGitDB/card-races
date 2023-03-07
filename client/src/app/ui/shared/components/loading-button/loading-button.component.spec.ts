import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';

import { LoadingButtonComponent } from './loading-button.component';

describe('LoadingButtonComponent', () => {
  let component: LoadingButtonComponent;
  let fixture: ComponentFixture<LoadingButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatButtonModule],
      declarations: [LoadingButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
