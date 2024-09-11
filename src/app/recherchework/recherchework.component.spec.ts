import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheworkComponent } from './recherchework.component';

describe('RechercheworkComponent', () => {
  let component: RechercheworkComponent;
  let fixture: ComponentFixture<RechercheworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechercheworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercheworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
