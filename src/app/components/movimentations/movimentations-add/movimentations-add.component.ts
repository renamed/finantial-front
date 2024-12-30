import { Component } from '@angular/core';
import { InstitutionsService } from '../../../services/institutions.service';
import { CategoriesService } from '../../../services/categories.service';
import { PeriodsService } from '../../../services/periods.service';
import { CategoryResponse, CategoryWithChildrenRespose } from '../../../models/CategoryResponse';
import { InstitutionResponse } from '../../../models/InstitutionResponse';
import { PeriodResponse } from '../../../models/PeriodResponse';
import { MovimentationRequest } from '../../../models/MovimentationRequest';
import { MovimentationsService } from '../../../services/movimentations.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Constants } from '../../../models/Constants';
import { setError, setSuccess } from '../../../scripts/helpers';

@Component({
  selector: 'app-movimentations-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movimentations-add.component.html',
  styleUrl: './movimentations-add.component.scss'
})
export class MovimentationsAddComponent {
  movimentationForm!: FormGroup;

  categoriesService: CategoriesService;
  institutionsSerice: InstitutionsService;
  periodsService: PeriodsService;
  movimentationService: MovimentationsService;

  categories: CategoryResponse[] = [];
  institutions: InstitutionResponse[] = [];
  periods: PeriodResponse[] = [];

  msg: string = '';
  newCat = '';
  
  constructor(private fb: FormBuilder, categoriesService: CategoriesService, institutionsSerice: InstitutionsService, periodsService: PeriodsService, movimentationService: MovimentationsService) {
    this.categoriesService = categoriesService;
    this.institutionsSerice = institutionsSerice;
    this.periodsService = periodsService;
    this.movimentationService = movimentationService;
  }

  async ngOnInit() {
    const today = new Date().toISOString().split('T')[0];

    this.movimentationForm = this.fb.group({
      categoryId: [Constants.INVALID_ID, Validators.required],
      institutionId: [Constants.INVALID_ID, Validators.required],
      periodId: [Constants.INVALID_ID, Validators.required],
      value: ['', Validators.required],
      description: ['', Validators.required],
      date: [today, Validators.required]
    });

    try {
      await Promise.all([
        this.initCategories(),
        this.initInstitutions(),
        this.initPeriods()
      ]);

    } catch (error: any) {
      this.msg = `Error: ${error}`;
      setError('message');
    }
  }

  async onSubmit() {
    this.msg = '';

      const newMovimentation : MovimentationRequest = {
        date: this.movimentationForm.value.date,
        categoryId: this.movimentationForm.value.categoryId,
        institutionId: this.movimentationForm.value.institutionId,
        periodId: this.movimentationForm.value.periodId,
        value: this.movimentationForm.value.value,
        description: this.movimentationForm.value.description
      };

      try {
        
      
      const [statusCode, response] = await this.movimentationService.AddAsync(newMovimentation);
      if (statusCode !== 201) {
        this.msg = response;
        setError('message');
      }
      else{
        this.newCat = response;
        this.msg = 'Movimentation added successfully';
        setSuccess('message');
      }
    } catch (error) {
      this.msg += `<br/>Error: ${error}`;
      setError('message');   
    }
  }

  async initPeriods() {
    const [statusCode, periods] = await this.periodsService.ListAsync();
    if (statusCode !== 200) {
      this.msg += '<br/>Failed to load periods';
      setError('message');
    } else {
      this.periods = [{id: Constants.INVALID_ID, description: 'Select period'}, ... periods];
    }
  }

  async initCategories() {
    const [statusCode, categories] = await this.categoriesService.ListAsync();
    if (statusCode !== 200) {
      this.msg += '<br />Failed to load categories';
      setError('message');
    } else {
      this.categories = [{id: Constants.INVALID_ID, name: 'Select category'}, ... this.flattenCategories(categories)];
    }
  }

  async initInstitutions() {
    const [statusCode, institutions] = await this.institutionsSerice.ListAsync();
    if (statusCode !== 200) {
      this.msg += '<br />Failed to load institutions';
      setError('message');
    } else {
      this.institutions = [{id: Constants.INVALID_ID, name: 'Select institution'}, ... institutions];
    }
  }

  flattenCategories(categories: CategoryWithChildrenRespose[], level: number = 0): CategoryResponse[] {
    let flatCategories: CategoryResponse[] = [];
    for (let category of categories) {
      flatCategories.push({ id: category.id, name: '-'.repeat(level * 2) + category.name });
      if (category.children && category.children.length > 0) {
        flatCategories = flatCategories.concat(this.flattenCategories(category.children, level + 1));
      }
    }
    return flatCategories;
  }
}
