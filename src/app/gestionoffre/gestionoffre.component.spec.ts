import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionoffreComponent } from './gestionoffre.component';

describe('GestionoffreComponent', () => {
  let component: GestionoffreComponent;
  let fixture: ComponentFixture<GestionoffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionoffreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionoffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
