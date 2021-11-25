import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartHighChartsComponent } from './bar-chart-high-charts.component';

describe('BarChartHighChartsComponent', () => {
  let component: BarChartHighChartsComponent;
  let fixture: ComponentFixture<BarChartHighChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartHighChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartHighChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
