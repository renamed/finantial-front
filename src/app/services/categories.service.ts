import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Constants } from '../models/Constants';
import { CategoryRequest } from '../models/CategoryRequest';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends BaseService {

  constructor(httpClient: HttpClient) { super(httpClient); }

  ListAsync = async () => {
    return await this.get(Constants.CATEGORIES_BASE_URL);
  };

  ListChildrenAsync = async (parent_id: string) => {
    return await this.get(`${Constants.CATEGORIES_BASE_URL}/children?parent_id=${parent_id || ''}`);
  }
  AddAsync = async (category: CategoryRequest) => {
    return await this.post(Constants.CATEGORIES_BASE_URL, category);
  }
  EditAsync = async (id: string, category: CategoryRequest) => {
    return await this.put(`${Constants.CATEGORIES_BASE_URL}/${id}`, category);
  }
  DeleteAsync = async (id: string) => {
    return await this.delete(`${Constants.CATEGORIES_BASE_URL}/${id}`);
  }
}
