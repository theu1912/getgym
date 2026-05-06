import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsGrid } from './units-grid';

describe('UnitsGrid', () => {
  let component: UnitsGrid;
  let fixture: ComponentFixture<UnitsGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitsGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitsGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
