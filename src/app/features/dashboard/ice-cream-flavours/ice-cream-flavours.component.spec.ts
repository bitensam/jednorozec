import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IceCreamFlavoursComponent } from './ice-cream-flavours.component';

describe('IceCreamFlavoursComponent', () => {
  let component: IceCreamFlavoursComponent;
  let fixture: ComponentFixture<IceCreamFlavoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IceCreamFlavoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IceCreamFlavoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
