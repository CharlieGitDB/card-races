import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { SUIT } from 'src/app/data/types/Suit';
import {
  MOCK_GROUP_ID,
  MOCK_NICKNAME,
  MOCK_USER_ID,
} from 'src/app/testing/mock';

import { PlayerListComponent } from './player-list.component';

describe('PlayerListComponent', () => {
  let component: PlayerListComponent;
  let componentRef: ComponentRef<PlayerListComponent>;
  let fixture: ComponentFixture<PlayerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatListModule, MatTableModule],
      declarations: [PlayerListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerListComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => fixture.destroy());

  it('should not have any table rows when Input() users is null', () => {
    const rows = fixture.debugElement.query(By.css('tbody tr'));

    expect(rows).toBeFalsy();
  });

  it('should have table rows when Input() users has data', () => {
    const mockSuit = SUIT.DIAMONDS;
    componentRef.setInput('users', {
      [MOCK_USER_ID]: {
        id: MOCK_USER_ID,
        group: MOCK_GROUP_ID,
        suit: mockSuit,
        nickname: MOCK_NICKNAME,
      },
    });
    fixture.detectChanges();

    const rows = fixture.debugElement.query(By.css('tbody tr'));

    expect(rows).toBeTruthy();

    const cells = rows.queryAll(By.css('th'));
    const firstCell = cells[0];
    const secondCell = cells[1];

    const suitImg = secondCell.query(By.css('img'));

    const suitSrc = (suitImg.nativeElement as HTMLImageElement).src.split(
      '/assets/'
    )[1];

    expect(firstCell.nativeElement.textContent).toBe(MOCK_NICKNAME);
    expect(suitImg).toBeTruthy();
    expect(suitSrc).toEqual(`${mockSuit.toLowerCase()}.svg`);
  });
});
