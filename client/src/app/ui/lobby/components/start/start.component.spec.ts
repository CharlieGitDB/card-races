import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StartComponent } from './start.component';

describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable start button when disabled Input() is true', () => {
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();
    const startButton = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;
    expect(startButton.disabled).toBeTruthy();
  });

  it('should NOT disable start button when disabled Input() is false', () => {
    fixture.componentInstance.disabled = false;
    fixture.detectChanges();
    const startButton = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;
    expect(startButton.disabled).toBeFalse();
  });
});
