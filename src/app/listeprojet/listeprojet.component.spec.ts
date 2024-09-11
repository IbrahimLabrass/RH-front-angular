import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeprojetComponent } from './listeprojet.component';

describe('ListeprojetComponent', () => {
  let component: ListeprojetComponent;
  let fixture: ComponentFixture<ListeprojetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeprojetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
