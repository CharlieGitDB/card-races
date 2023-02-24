import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';

import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateComponent],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  describe('direct component tests', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(CreateComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    afterEach(() => fixture.destroy());

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should disable button when loading is true', () => {
      component.loading = true;
      fixture.detectChanges();

      const createGameButton = fixture.debugElement.query(By.css('button'))
        .nativeElement as HTMLButtonElement;

      console.log(createGameButton, 'cgb');

      expect(createGameButton.disabled).toBeTrue();
    });

    it('should NOT disable button when loading is true', () => {
      component.loading = false;
      fixture.detectChanges();

      const createGameButton = fixture.debugElement.query(By.css('button'))
        .nativeElement as HTMLButtonElement;

      expect(createGameButton.disabled).toBeFalse();
    });

    it('should NOT disable button when loading is true', () => {
      component.loading = false;

      const createGameButton = fixture.debugElement.query(By.css('button'))
        .nativeElement as HTMLButtonElement;

      expect(createGameButton.disabled).toBeFalse();
    });
  });

  // describe('from host component tests', () => {});
});
