import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVmComponent } from './customer-vm.component';

describe('CustomerVmComponent', () => {
  let component: CustomerVmComponent;
  let fixture: ComponentFixture<CustomerVmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerVmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerVmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
