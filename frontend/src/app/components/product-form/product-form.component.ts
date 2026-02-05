import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[] = [];
  selectedFile: File | null = null;
  selectedFileName: string | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product?: Product }
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      categoryId: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(cats => {
      this.categories = cats;
    });

    if (this.data.product) {
      this.productForm.patchValue({
        name: this.data.product.name,
        description: this.data.product.description,
        price: this.data.product.price,
        stock: this.data.product.stock,
        categoryId: this.data.product.categoryId
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
    }
  }

  save() {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const productData: any = {
        name: formValue.name,
        description: formValue.description,
        price: formValue.price,
        stock: formValue.stock,
        categoryId: formValue.categoryId // Backend expects categoryId directly in DTO
      }

      if (this.data.product) {
        productData.id = this.data.product.id;
      }

      this.dialogRef.close({ product: productData, image: this.selectedFile });
    }
  }
}
