import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoryWithChildrenRespose } from '../../../models/CategoryResponse';
import { CategoriesService } from '../../../services/categories.service';
import { setError, setSuccess } from '../../../scripts/helpers';

@Component({
  selector: 'app-categories-remove',
  imports: [CommonModule],
  templateUrl: './categories-remove.component.html',
  styleUrl: './categories-remove.component.scss'
})
export class CategoriesRemoveComponent {

  categoriesService: CategoriesService;
  categories: CategoryWithChildrenRespose[] = [];
  msg: string = '';

  constructor(categoriesService: CategoriesService) {
    this.categoriesService = categoriesService;
  }

  async ngOnInit() {
    await this.loadCategories();
  }

  private async loadCategories() {
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
      setError(error.message || error);
    }
  }

  async deleteCategory(id: string, name: string) {
    if (!confirm(`Delete ${name}?`)) {
      return;
    }
    const [statusCode, message] = await this.categoriesService.DeleteAsync(id);
    if (statusCode !== 204) {
      this.msg = message;
      setError('message');
    }
    else {      
      await this.loadCategories();
      this.msg = `${name} deleted successfuly`;
      setSuccess('message');

      document.getElementById('message')?.scrollIntoView();
    }
  }
}
