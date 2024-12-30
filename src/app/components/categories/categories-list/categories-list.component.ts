import { Component } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { CategoryWithChildrenRespose } from '../../../models/CategoryResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories-list',
  imports: [CommonModule],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent {
  categoriesService: CategoriesService;
  categories: CategoryWithChildrenRespose[] = [];
  msg: string = '';

  constructor(categoriesService: CategoriesService) {
    this.categoriesService = categoriesService;
  }

  async ngOnInit() {
    try {
      const [statusCode, categories] = await this.categoriesService.ListAsync();
      if (statusCode >= 300) {
        this.msg = categories;
      }
      else {
        this.msg = '';
        this.categories = categories;
      }
    } catch (error: any) {
        this.msg = error.message || error;
    }
  }
}
