import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeoffreComponent } from './listeoffre.component';

describe('ListeoffreComponent', () => {
  let component: ListeoffreComponent;
  let fixture: ComponentFixture<ListeoffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeoffreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeoffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
