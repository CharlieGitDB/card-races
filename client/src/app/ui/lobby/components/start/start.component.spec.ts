import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StartComponent } from './start.component';

describe('StartComponent', () => {
  let component: StartComponent;
  let componentRef: ComponentRef<StartComponent>;
  let fixture: ComponentFixture<StartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable start button when disabled Input() is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const startButton = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;
    expect(startButton.disabled).toBeTruthy();
  });

  it('should NOT disable start button when Input() disabled is false', () => {
    componentRef.setInput('disabled', false);
    fixture.detectChanges();

    const startButton = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;
    expect(startButton.disabled).toBeFalse();
  });

  it('should emit startGame when disabled is false and start button is clicked', () => {
    componentRef.setInput('disabled', false);
    fixture.detectChanges();

    spyOn(component.startGame, 'emit');

    const startButton = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;
    startButton.click();

    expect(component.startGame.emit).toHaveBeenCalled();
  });

  it('should emit startGame when disabled is false and start button is clicked', () => {
    componentRef.setInput('disabled', false);
    fixture.detectChanges();

    spyOn(component.startGame, 'emit');

    const startButton = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;
    startButton.click();

    expect(component.startGame.emit).toHaveBeenCalled();
  });
});
