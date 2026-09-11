import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Process } from './process';

describe('Process', () => {
  let component: Process;
  let fixture: ComponentFixture<Process>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Process],
    }).compileComponents();

    fixture = TestBed.createComponent(Process);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose four ordered steps with typed icon identifiers', () => {
    expect(component.steps.map((step) => step.number)).toEqual(['01', '02', '03', '04']);
    expect(component.steps.map((step) => step.icon)).toEqual([
      'consult',
      'develop',
      'source',
      'host',
    ]);
    expect(fixture.nativeElement.querySelectorAll('article.step')).toHaveLength(4);
  });
});
