import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEventsComponent } from './manageevents.component';

describe('ManagetasksComponent', () => {
  let component: ManageEventsComponent;
  let fixture: ComponentFixture<ManageEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
