import { Component, ElementRef, ViewChild } from '@angular/core';
import { MovimentationResponse } from '../../../models/MovimentationResponse';
import { CategoryResponse } from '../../../models/CategoryResponse';
import { InstitutionResponse } from '../../../models/InstitutionResponse';
import { PeriodResponse } from '../../../models/PeriodResponse';
import { CategoriesService } from '../../../services/categories.service';
import { PeriodsService } from '../../../services/periods.service';
import { InstitutionsService } from '../../../services/institutions.service';
import { MovimentationsService } from '../../../services/movimentations.service';
import { CommonModule } from '@angular/common';
import { Constants } from '../../../models/Constants';
import { setError } from '../../../scripts/helpers';

@Component({
  selector: 'app-movimentations-list',
  imports: [CommonModule],
  templateUrl: './movimentations-list.component.html',
  styleUrl: './movimentations-list.component.scss'
})
export class MovimentationsListComponent {

  movimentations: MovimentationResponse[] = [];
  categories: CategoryResponse[] = [];
  periods: PeriodResponse[] = [];
  institutions: InstitutionResponse[] = [];

  @ViewChild('periodSelected') periodSelected!: ElementRef;
  @ViewChild('institutionSelected') institutionSelected!: ElementRef;

  periodId: string = Constants.INVALID_ID;
  institutionId: string = Constants.INVALID_ID;

  msg: string = '';

  categoriesService: CategoriesService;
  periodsService: PeriodsService;
  institutionsService: InstitutionsService;
  movimentationsService: MovimentationsService;

  constructor(categoriesService: CategoriesService, periodsService: PeriodsService, institutionsService: InstitutionsService, movimentationsService: MovimentationsService) {
    this.categoriesService = categoriesService;
    this.periodsService = periodsService;
    this.institutionsService = institutionsService;
    this.movimentationsService = movimentationsService;
  }

  async ngOnInit() {
    try {


      await Promise.all([
        this.LoadCategoriesAsync(),
        this.LoadPeriodsAsync(),
        this.LoadInstitutionsAsync()
      ]);
    } catch (error) {
      this.msg = `Error: ${error}`;
      setError('message');
    }
  }

  async LoadMovimentationAsync() {
    if (this.periodId === Constants.INVALID_ID) return;

    let [statusCode, movimentations]: [number, any] = [0, []];
    if (this.institutionId !== Constants.INVALID_ID) {
      [statusCode, movimentations] = await this.movimentationsService.ListByPeriodInstitutionAsync(this.periodId, this.institutionId);
    } else {
      [statusCode, movimentations] = await this.movimentationsService.ListByPeriodAsync(this.periodId);
    }

    if (statusCode === 200) {
      this.msg = '';
      this.movimentations = movimentations;
    } else {
      this.msg = movimentations;
      setError('message');
    }
  }

  async LoadInstitutionsAsync() {
    const [statusCode, institutions] = await this.institutionsService.ListAsync();
    if (statusCode === 200) {
      this.institutions = [{ id: Constants.INVALID_ID, name: 'Select institution' }, ...institutions];
    } else {
      this.msg = institutions;
      setError('message');
    }
  }

  async LoadPeriodsAsync() {
    const [statusCode, periods] = await this.periodsService.ListAsync();
    if (statusCode === 200) {
      this.periods = [{ id: Constants.INVALID_ID, name: 'Select period' }, ...periods];
    } else {
      this.msg = periods;
      setError('message');
    }
  }

  async LoadCategoriesAsync() {
    const [statusCode, categories] = await this.categoriesService.ListAsync();
    if (statusCode === 200) {
      this.categories = categories;
    } else {
      this.msg = categories;
      setError('message');
    }
  }

  onPeriodChange() {
    this.periodId = this.periodSelected.nativeElement.value;
  }

  onInstitutionChange() {
    this.institutionId = this.institutionSelected.nativeElement.value;
  }
}
