import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListItem, MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { SUIT } from 'src/app/data/types/Suit';
import { MOCK_USER_ID } from 'src/app/testing/mock';

import { PlayerListComponent } from './player-list.component';

describe('PlayerListComponent', () => {
  let component: PlayerListComponent;
  let componentRef: ComponentRef<PlayerListComponent>;
  let fixture: ComponentFixture<PlayerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatListModule],
      declarations: [PlayerListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerListComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => fixture.destroy());

  it('should not have any list items when Input() users is null', () => {
    const matListItems = fixture.debugElement.query(By.directive(MatListItem));

    expect(matListItems).toBeFalsy();
  });

  it('should have list items when Input() users has data', () => {
    componentRef.setInput('users', {
      [MOCK_USER_ID]: SUIT.DIAMONDS,
    });
    fixture.detectChanges();

    const matListItems = fixture.debugElement.query(By.directive(MatListItem));

    expect(matListItems).toBeTruthy();

    const firstListItem = matListItems.children[0];

    expect(firstListItem.nativeElement.textContent).toBe(
      `${MOCK_USER_ID} - ${SUIT.DIAMONDS}`
    );
  });
});
