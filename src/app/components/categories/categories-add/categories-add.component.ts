import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { CategoryResponse, CategoryWithChildrenRespose } from '../../../models/CategoryResponse';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryRequest } from '../../../models/CategoryRequest';
import { setError, setSuccess } from '../../../scripts/helpers';

@Component({
  selector: 'app-categories-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories-add.component.html',
  styleUrl: './categories-add.component.scss'
})
export class CategoriesAddComponent {
  categoriesService: CategoriesService;
  categories: CategoryWithChildrenRespose[] = [];
  flatCategories: CategoryResponse[] = [];
  categoryForm!: FormGroup;
  msg: string = '';

  constructor(private fb: FormBuilder, categoriesService: CategoriesService) {
    this.categoriesService = categoriesService;
  }

  async ngOnInit() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      parent: ['', Validators.required]
    });

    await this.loadCategories();
  }

  async loadCategories() {
    const [statusCode, categories] = await this.categoriesService.ListAsync();
    if (statusCode < 300) {
      this.categories = categories;
      this.flatCategories = [{ id: '00000000-0000-0000-0000-000000000000', name: 'NO PARENT' }, ...this.flattenCategories(this.categories)];
    } else {
      this.msg = 'Failed to load categories';
      setError('message');
    }
  }

  flattenCategories(categories: CategoryWithChildrenRespose[], level: number = 0): CategoryResponse[] {
    let flatCategories: CategoryResponse[] = [];
    for (let category of categories) {
      flatCategories.push({ id: category.id, name: '-'.repeat(level * 2) + category.name });
      if (category.children && category.children.length > 0) {
        flatCategories = flatCategories.concat(this.flattenCategories(category.children, level + 1));
      }
    }
    return flatCategories;
  }

  async onSubmit() {
    const request : CategoryRequest = {
      name: this.categoryForm.value.name,
      parentId: this.categoryForm.value.parent
    };

    const [statusCode, response] = await this.categoriesService.AddAsync(request);
    if (statusCode !== 201) {
      this.msg = response;
      setError('message'); 
    } else {
      this.msg = 'Category added successfully';
      setSuccess('message');
      this.categoryForm.reset();
      await this.loadCategories();
    }
  }

  
}
