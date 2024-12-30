import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionsRemoveComponent } from './institutions-remove.component';

describe('InstitutionsRemoveComponent', () => {
  let component: InstitutionsRemoveComponent;
  let fixture: ComponentFixture<InstitutionsRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitutionsRemoveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutionsRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
