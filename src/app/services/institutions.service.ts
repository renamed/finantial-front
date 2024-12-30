import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Constants } from '../models/Constants';
import { InstitutionRequest } from '../models/InstitutionRequest';

@Injectable({
  providedIn: 'root'
})
export class InstitutionsService extends BaseService {

  constructor(httpClient: HttpClient) { super(httpClient); }
  
  ListAsync = async () => {
    return await this.get(Constants.INSTITUTIONS_BASE_URL);
  }

  AddAsync = async (institution: InstitutionRequest) => {
    return await this.post(Constants.INSTITUTIONS_BASE_URL, institution);
  }

  EditAsync = async (id: string, institution : InstitutionRequest) => {
    return await this.put(`${Constants.INSTITUTIONS_BASE_URL}/${id}`, institution);
  }
  
  DeleteAsync = async (id : string) => {
    return await this.delete(`${Constants.INSTITUTIONS_BASE_URL}/${id}`);
  }
}