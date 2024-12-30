import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentationsAddComponent } from './movimentations-add.component';

describe('MovimentationsAddComponent', () => {
  let component: MovimentationsAddComponent;
  let fixture: ComponentFixture<MovimentationsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimentationsAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimentationsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
