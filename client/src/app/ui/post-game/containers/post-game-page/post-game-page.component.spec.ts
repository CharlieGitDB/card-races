import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { PostGamePageComponent } from './post-game-page.component';

describe('PostGamePageComponent', () => {
  let component: PostGamePageComponent;
  let fixture: ComponentFixture<PostGamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostGamePageComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(PostGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
