import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindtalentComponent } from './findtalent.component';

describe('FindtalentComponent', () => {
  let component: FindtalentComponent;
  let fixture: ComponentFixture<FindtalentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindtalentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindtalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
