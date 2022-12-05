import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsSearchComponent } from './deals-search.component';

describe('DealsSearchComponent', () => {
  let component: DealsSearchComponent;
  let fixture: ComponentFixture<DealsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealsSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
