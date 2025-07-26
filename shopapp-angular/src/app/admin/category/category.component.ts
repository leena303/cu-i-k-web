import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  searchForm!: FormGroup;
  editMode: boolean = false;
  viewMode: boolean = false;
  categoryForm!: FormGroup;
  editingCategoryId: number | null = null;

  page:number = 1;
  pageSize: number = 5;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.initForm();
    this.initSearchForm();
  }

  initForm() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      keyword: ['']
    });
  }


  fetchCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  filteredCategories(): Category[] {
    const keyword = this.searchForm.get('keyword')?.value?.trim().toLowerCase() || '';
    if (!keyword) return this.categories;
    return this.categories.filter(c =>
      c.name.toLowerCase().includes(keyword)
    );
  }


  get pagedCategories(): Category[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredCategories().slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCategories().length / this.pageSize);
  }


  addCategory() {
    this.editMode = true;
    this.viewMode = false;
    this.editingCategoryId = null;
    this.categoryForm.reset();
  }

  editCategory(category: Category) {
    this.editMode = true;
    this.viewMode = false;
    this.editingCategoryId = category.category_id;
    this.categoryForm.setValue({
      name: category.name,
      description: category.description || ''
    });
    this.categoryForm.enable();
  }

  
  viewCategory(category: Category) {
    this.viewMode = true;
    this.editMode = false;
    this.categoryForm.setValue({
      name: category.name,
      description: category.description || ''
    });
    this.categoryForm.disable();
  }
  
  closeView() {
    this.viewMode = false;
    this.categoryForm.enable();
  }

  saveCategory() {
    if (this.categoryForm.invalid) return;
    const formValue = this.categoryForm.value;
    if (this.editingCategoryId == null) {
      // Thêm mới
      this.categoryService.addCategory({
        category_id: 0,
        name: formValue.name,
        description: formValue.description
      }).subscribe(() => {
        this.fetchCategories();
        this.cancelEdit();
      });
    } else {
      // Sửa
      this.categoryService.updateCategory({
        category_id: this.editingCategoryId,
        name: formValue.name,
        description: formValue.description
      }).subscribe(() => {
        this.fetchCategories();
        this.cancelEdit();
      });
    }
  }

  deleteCategory(id: number) {
    if (confirm('Bạn có chắc muốn xóa danh mục này?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.fetchCategories();
      });
    }
  }

  cancelEdit() {
    this.editMode = false;
    this.editingCategoryId = null;
    this.categoryForm.reset();
  }
}