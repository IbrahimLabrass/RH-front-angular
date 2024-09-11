import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatetjobComponent } from './updatetjob.component';

describe('UpdatetjobComponent', () => {
  let component: UpdatetjobComponent;
  let fixture: ComponentFixture<UpdatetjobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatetjobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatetjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
