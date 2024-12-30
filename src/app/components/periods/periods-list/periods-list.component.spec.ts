import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodsListComponent } from './periods-list.component';

describe('PeriodsListComponent', () => {
  let component: PeriodsListComponent;
  let fixture: ComponentFixture<PeriodsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
