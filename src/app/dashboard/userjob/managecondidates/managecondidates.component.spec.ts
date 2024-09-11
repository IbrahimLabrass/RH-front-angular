import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecondidatesComponent } from './managecondidates.component';

describe('ManagecondidatesComponent', () => {
  let component: ManagecondidatesComponent;
  let fixture: ComponentFixture<ManagecondidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagecondidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagecondidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
