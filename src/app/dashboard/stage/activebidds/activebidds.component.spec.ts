import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivebiddsComponent } from './activebidds.component';

describe('ActivebiddsComponent', () => {
  let component: ActivebiddsComponent;
  let fixture: ComponentFixture<ActivebiddsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivebiddsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivebiddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
