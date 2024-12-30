import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InstitutionRequest } from '../../../models/InstitutionRequest';
import { InstitutionsService } from '../../../services/institutions.service';
import { setError, setSuccess } from '../../../scripts/helpers';

@Component({
  selector: 'app-institutions-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './institutions-add.component.html',
  styleUrl: './institutions-add.component.scss'
})
export class InstitutionsAddComponent {
  institutionForm!: FormGroup;
  msg: string = '';
  institutionsService: InstitutionsService;

  constructor(private fb: FormBuilder, institutionsService: InstitutionsService) {
    this.institutionsService = institutionsService;
  }

  async ngOnInit() {
    this.institutionForm = this.fb.group({
          name: ['', Validators.required],
          initialBalance: ['', Validators.required],
          initialBalanceDate: ['', Validators.required]
        });
      }

  async onSubmit() {
    const request : InstitutionRequest = {
      name: this.institutionForm.value.name,
      initialBalance: this.institutionForm.value.initialBalance,
      initialBalanceDate: this.institutionForm.value.initialBalanceDate
    };

    const [statusCode, message] = await this.institutionsService.AddAsync(request);
    if (statusCode !== 201) {
      this.msg = message;
      setError('message');
    }
    else {
      this.msg = 'Institution added successfully';
      setSuccess('message');
      this.institutionForm.reset();
    }
  }
}
