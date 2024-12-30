import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InstitutionResponse } from '../../../models/InstitutionResponse';
import { InstitutionsService } from '../../../services/institutions.service';
import { setError, setSuccess } from '../../../scripts/helpers';

@Component({
  selector: 'app-institutions-remove',
  imports: [CommonModule],
  templateUrl: './institutions-remove.component.html',
  styleUrl: './institutions-remove.component.scss'
})
export class InstitutionsRemoveComponent {
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

  async deleteInstitution(id: string, name: string) {
    if (!confirm(`Delete ${name}?`)) {
      return;
    }

    const [statusCode, message] = await this.institutionService.DeleteAsync(id);
    if (statusCode !== 204) {
      this.msg = message;
      setError('message');
    }
    else {
      await this.LoadInstitutions();
      
      this.msg = `${name} deleted successfuly`;
      setSuccess('message');
    }
  }
}
