import { Component, ElementRef, viewChild, ViewChild } from '@angular/core';
import { PeriodResponse } from '../../models/PeriodResponse';
import { CommonModule } from '@angular/common';
import { Constants } from '../../models/Constants';
import { DashboardValueByCategory } from '../../models/DashboardValueByCategory';
import { setError } from '../../scripts/helpers';
import { DashboardService } from '../../services/dashboard.service';
import { PeriodsService } from '../../services/periods.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  periods: PeriodResponse[] = [];
  periodId: string = Constants.INVALID_ID;
  categoryParentId: string = Constants.INVALID_ID;

  dashboardService: DashboardService;
  periodsService: PeriodsService;
  valueByCategory: DashboardValueByCategory[] = [];

  msg: string = '';

  @ViewChild('periodSelected') periodSelected!: ElementRef;
  @ViewChild('categoryParentIdSelected') categoryParentIdSelected!: ElementRef;

  constructor(dashboardService: DashboardService, periodsService: PeriodsService) {
    this.dashboardService = dashboardService;
    this.periodsService = periodsService;
  }

  async ngOnInit() {
    try {
      await Promise.all([
        this.LoadPeriodsAsync()
      ]);
    } catch (error) {
      this.msg = `Error: ${error}`;
      setError('message');
    }
  }
  async LoadPeriodsAsync(): Promise<any> {
    const [statusCode, response] = await this.periodsService.ListAsync();
    if (statusCode !== 200) {
      this.msg = response;
      setError('message');
      return;
    }

    this.periods = response;
    this.periodId = this.periods[0].id;
    await this.LoadDashboardValuesAsync();
  }

  async DrillDown(parentId: string, rowNum: number) {
    const [statusCode, response] = await this.dashboardService.GetValuesByCategoryAsync(this.periodId, parentId);
    if (statusCode !== 200) {
      this.msg = response;
      setError('message');
      return;
    }

    this.valueByCategory.splice(rowNum, 0, ...response);
    console.log(this.valueByCategory);
  }

  async onPeriodChange() {
    this.periodId = this.periodSelected.nativeElement.value;
    await this.LoadDashboardValuesAsync();
  }

  async LoadDashboardValuesAsync() {
    const [statusCode, response] = await this.dashboardService.GetValuesByCategoryAsync(this.periodId, this.categoryParentId);
    if (statusCode !== 200) {
      this.msg = response;
      setError('message');
      return;
    }

    this.msg = '';
    this.valueByCategory = response;
  }
}
