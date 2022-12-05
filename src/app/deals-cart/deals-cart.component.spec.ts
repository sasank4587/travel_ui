import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsCartComponent } from './deals-cart.component';

describe('DealsCartComponent', () => {
  let component: DealsCartComponent;
  let fixture: ComponentFixture<DealsCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealsCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealsCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
