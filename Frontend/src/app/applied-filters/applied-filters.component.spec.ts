import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedFiltersComponent } from './applied-filters.component';

describe('AppliedFiltersComponent', () => {
  let component: AppliedFiltersComponent;
  let fixture: ComponentFixture<AppliedFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppliedFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppliedFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
