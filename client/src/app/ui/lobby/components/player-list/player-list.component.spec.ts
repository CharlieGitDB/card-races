import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListItem, MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { SUIT } from 'src/app/data/types/Suit';
import { MOCK_USER_ID } from 'src/app/testing/mock';

import { PlayerListComponent } from './player-list.component';

describe('PlayerListComponent', () => {
  @Component({
    template: '<app-player-list [users]="users"></app-player-list>',
  })
  class HostComponent {
    public users = null;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatListModule],
      declarations: [HostComponent, PlayerListComponent],
    }).compileComponents();
  });

  describe('direct component tests', () => {
    let component: PlayerListComponent;
    let fixture: ComponentFixture<PlayerListComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(PlayerListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    afterEach(() => fixture.destroy());
  });

  describe('from host component tests', () => {
    let hostComponent: PlayerListComponent;
    let hostFixture: ComponentFixture<PlayerListComponent>;

    beforeEach(async () => {
      hostFixture = TestBed.createComponent(HostComponent);
      hostComponent = hostFixture.componentInstance;
      hostFixture.detectChanges();
    });

    afterEach(() => hostFixture.destroy());

    it('should not have any list items when Input() users is null', () => {
      hostFixture.detectChanges();

      const matListItems = hostFixture.debugElement
        .query(By.directive(PlayerListComponent))
        .query(By.directive(MatListItem));

      expect(matListItems).toBeFalsy();
    });

    it('should have list items when Input() users has data', () => {
      hostComponent.users = {
        [MOCK_USER_ID]: SUIT.DIAMONDS,
      };
      hostFixture.detectChanges();

      const matListItems = hostFixture.debugElement
        .query(By.directive(PlayerListComponent))
        .query(By.directive(MatListItem));

      expect(matListItems).toBeTruthy();

      const firstListItem = matListItems.children[0];

      expect(firstListItem.nativeElement.textContent).toBe(
        `${MOCK_USER_ID} - ${SUIT.DIAMONDS}`
      );
    });
  });
});
