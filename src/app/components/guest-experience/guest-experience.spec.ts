import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestExperience } from './guest-experience';

describe('GuestExperience', () => {
  let component: GuestExperience;
  let fixture: ComponentFixture<GuestExperience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestExperience],
    }).compileComponents();

    fixture = TestBed.createComponent(GuestExperience);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
