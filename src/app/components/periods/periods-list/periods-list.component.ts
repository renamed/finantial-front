import { Component } from '@angular/core';
import { PeriodResponse } from '../../../models/PeriodResponse';
import { PeriodsService } from '../../../services/periods.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-periods-list',
  imports: [CommonModule],
  templateUrl: './periods-list.component.html',
  styleUrl: './periods-list.component.scss'
})
export class PeriodsListComponent {
  periods: PeriodResponse[] = [];
  msg: string = '';
  periodsService: PeriodsService;

  constructor(periodsService: PeriodsService) {
    this.periodsService = periodsService;
  }

  async ngOnInit() {
    await this.LoadPeriods();
  }

  async LoadPeriods() {
    const [statusCode, periods] = await this.periodsService.ListAsync();
    if (statusCode !== 200) {
      this.msg = periods;
    }
    else {
      this.msg = '';
      this.periods = periods
    }
  }
}
