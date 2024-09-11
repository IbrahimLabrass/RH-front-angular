import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostworkComponent } from './postwork.component';

describe('PostworkComponent', () => {
  let component: PostworkComponent;
  let fixture: ComponentFixture<PostworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
