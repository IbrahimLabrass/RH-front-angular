import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagebiddersComponent } from './managebidders.component';

describe('ManagebiddersComponent', () => {
  let component: ManagebiddersComponent;
  let fixture: ComponentFixture<ManagebiddersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagebiddersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagebiddersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
