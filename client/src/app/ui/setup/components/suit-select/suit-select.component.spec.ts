import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { suitReducer, SUIT_KEY } from 'src/app/data/store/store';
import { suitList } from 'src/app/data/types/Suit';
import { MOCK_ACTIVATED_ROUTE } from 'src/app/testing/mock';

import { SuitSelectComponent } from './suit-select.component';

describe('SuitSelectComponent', () => {
  let component: SuitSelectComponent;
  let fixture: ComponentFixture<SuitSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(
          //use real store instead of mock store
          {
            [SUIT_KEY]: suitReducer,
          },
          {}
        ),
      ],
      declarations: [SuitSelectComponent],
      providers: [MOCK_ACTIVATED_ROUTE],
    }).compileComponents();

    fixture = TestBed.createComponent(SuitSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have select suit p tag', () => {
    const p = fixture.debugElement.query(By.css('p.mat-h1')).nativeElement;

    expect(p.textContent).toContain('Select Suit');
  });

  it('should display all card suits', () => {
    suitList.forEach((suit) => {
      const suitImg = fixture.debugElement.query(
        By.css(`img[src="/assets/card_${suit.toLowerCase()}.svg"]`)
      );
      expect(suitImg).toBeTruthy();
    });
  });

  it('should select suit on suit click', async () => {
    spyOn(component, 'selectSuit').and.callThrough();
    spyOn((component as any).setupFacade, 'setSuit').and.callThrough();

    const images = fixture.debugElement
      .queryAll(By.css('img'))
      .map((img) => img.nativeElement as HTMLImageElement);

    for (const suit of suitList) {
      const suitImage = images.find((image) => {
        const imgSrc = image.src.split('/assets/')[1];
        return imgSrc === `card_${suit.toLowerCase()}.svg`;
      });

      suitImage?.click();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.selectSuit).toHaveBeenCalledWith(suit);
      expect((component as any).setupFacade.setSuit).toHaveBeenCalledWith(suit);
      expect(suitImage?.classList.contains('selected')).toBeTruthy();
    }
  });
});
