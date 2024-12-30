import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../models/Constants';
import { MovimentationRequest } from '../models/MovimentationRequest';

@Injectable({
  providedIn: 'root'
})
export class MovimentationsService extends BaseService {

  constructor(httpClient: HttpClient) { super(httpClient); }

  ListByPeriodInstitutionAsync = async (periodId: string, institutionId: string) => {
    return await this.get(`${Constants.MOVIMENTATIONS_BASE_URL}/period/${periodId}/institution/${institutionId}`);
  }

  ListByPeriodAsync = async (periodId: string) => {
      return await this.get(`${Constants.MOVIMENTATIONS_BASE_URL}/period/${periodId}`);
  }
  
  AddAsync = async (movimentation: MovimentationRequest) => {
      return await this.post(Constants.MOVIMENTATIONS_BASE_URL, movimentation);
  }
}
