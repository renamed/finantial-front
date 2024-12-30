import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PeriodsService } from '../../../services/periods.service';
import { PeriodRequest } from '../../../models/PeriodRequest';

@Component({
  selector: 'app-periods-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './periods-add.component.html',
  styleUrl: './periods-add.component.scss'
})
export class PeriodsAddComponent {

  msg: string = '';
  periodsService: PeriodsService;
  periodForm!: FormGroup;

  constructor(private fb: FormBuilder, periodsService: PeriodsService) {
    this.periodsService = periodsService;
  }

  async ngOnInit() {
    this.periodForm = this.fb.group({
      initialDate: ['', Validators.required],
      finalDate: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  async onSubmit() {
    const period: PeriodRequest = {
      initialDate: this.periodForm.value.initialDate,
      finalDate: this.periodForm.value.finalDate,
      description: this.periodForm.value.description
    };

    const [statusCode, message] = await this.periodsService.AddAsync(period);
    if (statusCode !== 201) {
      this.msg = message;
    }
    else {
      this.msg = 'Period added successfully';
    }
  }
}
