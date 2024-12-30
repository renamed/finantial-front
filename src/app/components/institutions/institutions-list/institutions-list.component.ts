import { Component } from '@angular/core';
import { InstitutionResponse } from '../../../models/InstitutionResponse';
import { InstitutionsService } from '../../../services/institutions.service';
import { CommonModule } from '@angular/common';
import { setError } from '../../../scripts/helpers';

@Component({
  selector: 'app-institutions-list',
  imports: [CommonModule],
  templateUrl: './institutions-list.component.html',
  styleUrl: './institutions-list.component.scss'
})
export class InstitutionsListComponent {
  institutions: InstitutionResponse[] = [];
  msg: string = '';
  institutionService: InstitutionsService;

  constructor(institutionService: InstitutionsService) {
    this.institutionService = institutionService;
  }

  async ngOnInit() {
    await this.LoadInstitutions();
  }

  async LoadInstitutions() {
    const [statusCode, institutions] = await this.institutionService.ListAsync();
    if (statusCode !== 200) {
      this.msg = institutions;
      setError('message');
    }
    else {
      this.msg = '';
      this.institutions = institutions
  }
}
}
