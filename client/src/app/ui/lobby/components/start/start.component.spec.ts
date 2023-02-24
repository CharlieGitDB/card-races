import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StartComponent } from './start.component';

describe('StartComponent', () => {
  @Component({
    template: '<app-start [disabled]="disabled"></app-start>',
  })
  class HostComponent {
    public disabled = true;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, StartComponent],
    }).compileComponents();
  });

  describe('direct component tests', () => {
    let component: StartComponent;
    let fixture: ComponentFixture<StartComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(StartComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    afterEach(() => fixture.destroy());

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('from host component tests', () => {
    let hostComponent: HostComponent;
    let hostFixture: ComponentFixture<HostComponent>;

    beforeEach(() => {
      hostFixture = TestBed.createComponent(HostComponent);
      hostComponent = hostFixture.componentInstance;
      hostFixture.detectChanges();
    });

    afterEach(() => hostFixture.destroy());

    it('should disable start button when disabled Input() is true', () => {
      hostComponent.disabled = true;
      hostFixture.detectChanges();

      const startButton = hostFixture.debugElement.query(By.css('button'))
        .nativeElement as HTMLButtonElement;
      expect(startButton.disabled).toBeTruthy();
    });

    it('should NOT disable start button when Input() disabled is false', () => {
      hostComponent.disabled = false;
      hostFixture.detectChanges();

      const startButton = hostFixture.debugElement.query(By.css('button'))
        .nativeElement as HTMLButtonElement;
      expect(startButton.disabled).toBeFalse();
    });

    it('should emit startGame when disabled is false and start button is clicked', () => {
      hostComponent.disabled = false;
      hostFixture.detectChanges();

      const startComponent = hostFixture.debugElement.query(
        By.directive(StartComponent)
      ).componentInstance;

      spyOn(startComponent.startGame, 'emit');

      const startButton = hostFixture.debugElement.query(By.css('button'))
        .nativeElement as HTMLButtonElement;
      startButton.click();

      expect(startComponent.startGame.emit).toHaveBeenCalled();
    });

    it('should NOT emit startGame when disabled is false and start button is clicked', () => {
      hostComponent.disabled = true;
      hostFixture.detectChanges();

      const startComponent = hostFixture.debugElement.query(
        By.directive(StartComponent)
      ).componentInstance;

      spyOn(startComponent.startGame, 'emit');

      const startButton = hostFixture.debugElement.query(By.css('button'))
        .nativeElement as HTMLButtonElement;
      startButton.click();

      expect(startComponent.startGame.emit).not.toHaveBeenCalled();
    });
  });
});
