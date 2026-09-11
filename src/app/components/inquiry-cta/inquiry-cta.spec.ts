import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InquiryCta } from './inquiry-cta';

describe('InquiryCta', () => {
  let component: InquiryCta;
  let fixture: ComponentFixture<InquiryCta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InquiryCta],
    }).compileComponents();

    fixture = TestBed.createComponent(InquiryCta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
