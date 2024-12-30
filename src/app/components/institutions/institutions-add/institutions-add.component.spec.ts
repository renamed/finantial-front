import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionsAddComponent } from './institutions-add.component';

describe('InstitutionsAddComponent', () => {
  let component: InstitutionsAddComponent;
  let fixture: ComponentFixture<InstitutionsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitutionsAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutionsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
