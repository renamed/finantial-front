import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentationsListComponent } from './movimentations-list.component';

describe('MovimentationsListComponent', () => {
  let component: MovimentationsListComponent;
  let fixture: ComponentFixture<MovimentationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimentationsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimentationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
