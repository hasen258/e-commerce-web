import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
    selector: 'app-category-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule
    ],
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
    categoryForm: FormGroup;
    categories: Category[] = [];

    constructor(
        private fb: FormBuilder,
        private categoryService: CategoryService,
        public dialogRef: MatDialogRef<CategoryFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { category?: Category }
    ) {
        this.categoryForm = this.fb.group({
            name: ['', Validators.required],
            parentId: [null]
        });
    }

    ngOnInit() {
        this.categoryService.getCategories().subscribe(cats => {
            // Filter out self if editing to prevent cycles
            this.categories = this.data.category
                ? cats.filter(c => c.id !== this.data.category!.id)
                : cats;
        });

        if (this.data.category) {
            this.categoryForm.patchValue({
                name: this.data.category.name,
                parentId: this.data.category.parentId || null
            });
        }
    }

    save() {
        if (this.categoryForm.valid) {
            const formValue = this.categoryForm.value;
            const categoryData: any = {
                name: formValue.name,
                parentId: formValue.parentId || null
            };

            if (this.data.category) {
                categoryData.id = this.data.category.id;
            }

            this.dialogRef.close(categoryData);
        }
    }
}
