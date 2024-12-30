import { Component } from '@angular/core';
import { PeriodResponse } from '../../../models/PeriodResponse';
import { PeriodsService } from '../../../services/periods.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-periods-remove',
  imports: [CommonModule],
  templateUrl: './periods-remove.component.html',
  styleUrl: './periods-remove.component.scss'
})
export class PeriodsRemoveComponent {
  periods: PeriodResponse[] = [];
  msg: string = '';
  periodService: PeriodsService;

  constructor(periodService: PeriodsService) {
    this.periodService = periodService;
  }

  async ngOnInit() {
    await this.LoadPeriods();
  }

  async LoadPeriods() {
    const [statusCode, periods] = await this.periodService.ListAsync();
    if (statusCode !== 200) {
      this.msg = periods;
    }
    else {
      this.msg = '';
      this.periods = periods
    }
  }

  async deletePeriod(id: string) {
    if (!confirm('Are you sure you want to delete this period?')) {
      return;
    }

    const [statusCode, message] = await this.periodService.DeleteAsync(id);
    if (statusCode !== 204) {
      this.msg = message;
    }
    else {
      this.msg = '';
      await this.LoadPeriods();
    }
  }
}
