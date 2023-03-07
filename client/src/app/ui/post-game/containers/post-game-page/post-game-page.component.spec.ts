import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { provideMockStore } from '@ngrx/store/testing';
import { LoadingButtonComponent } from 'src/app/ui/shared/components/loading-button/loading-button.component';

import { PostGamePageComponent } from './post-game-page.component';

describe('PostGamePageComponent', () => {
  let component: PostGamePageComponent;
  let fixture: ComponentFixture<PostGamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatButtonModule],
      declarations: [PostGamePageComponent, LoadingButtonComponent],
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
