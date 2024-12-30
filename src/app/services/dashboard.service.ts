import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../models/Constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService {

  constructor(httpClient: HttpClient) { super(httpClient); }

  GetValuesByCategoryAsync = async (periodId: string, categoryParentId: string | null = null) => {
    let url = `${Constants.DASHBOARD_GROUPBY_CATEGORY_URL}/${periodId}`;
    if (categoryParentId) {      
      url += `?parentId=${categoryParentId}`;
    }

    return await this.get(url);
  }
}
