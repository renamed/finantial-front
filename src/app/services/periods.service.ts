import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../models/Constants';
import { PeriodRequest } from '../models/PeriodRequest';

@Injectable({
  providedIn: 'root'
})
export class PeriodsService extends BaseService {

  constructor(httpClient: HttpClient) { super(httpClient); }

  ListAsync = async () => {
    return await this.get(Constants.PERIODS_BASE_URL);
  }
  AddAsync = async (period : PeriodRequest) => {
    return await this.post(Constants.PERIODS_BASE_URL, period);
  }

  EditAsync = async (id: string, period: PeriodRequest) => {
    return await this.put(`${Constants.PERIODS_BASE_URL}/${id}`, period);
  }

  DeleteAsync = async (id: string) => {
    return await this.delete(`${Constants.PERIODS_BASE_URL}/${id}`);
  }
}
