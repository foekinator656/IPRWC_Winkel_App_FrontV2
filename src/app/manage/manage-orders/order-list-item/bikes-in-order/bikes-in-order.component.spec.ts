import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikesInOrderComponent } from './bikes-in-order.component';

describe('BikesInOrderComponent', () => {
  let component: BikesInOrderComponent;
  let fixture: ComponentFixture<BikesInOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BikesInOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikesInOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
