import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListecondidatureComponent } from './listecondidature.component';

describe('ListecondidatureComponent', () => {
  let component: ListecondidatureComponent;
  let fixture: ComponentFixture<ListecondidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListecondidatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListecondidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
