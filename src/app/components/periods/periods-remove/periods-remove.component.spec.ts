import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodsRemoveComponent } from './periods-remove.component';

describe('PeriodsRemoveComponent', () => {
  let component: PeriodsRemoveComponent;
  let fixture: ComponentFixture<PeriodsRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodsRemoveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodsRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
