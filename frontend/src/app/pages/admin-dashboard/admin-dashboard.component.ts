import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        MatTabsModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule
    ],
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
    productService = inject(ProductService);
    categoryService = inject(CategoryService);
    dialog = inject(MatDialog);

    products: Product[] = [];
    categories: Category[] = [];

    displayedProductColumns: string[] = ['id', 'name', 'price', 'actions'];
    displayedCategoryColumns: string[] = ['id', 'name', 'actions'];

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.productService.getProducts().subscribe(data => this.products = data);
        this.categoryService.getCategories().subscribe(data => this.categories = data);
    }

    addProduct() {
        const dialogRef = this.dialog.open(ProductFormComponent, {
            width: '600px',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.productService.createProduct(result.product, result.image).subscribe(() => this.loadData());
            }
        });
    }

    editProduct(product: Product) {
        const dialogRef = this.dialog.open(ProductFormComponent, {
            width: '600px',
            data: { product }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.productService.updateProduct(result.product.id, result.product, result.image).subscribe(() => this.loadData());
            }
        });
    }

    deleteProduct(id: number) {
        if (confirm('Are you sure you want to delete this product?')) {
            this.productService.deleteProduct(id).subscribe(() => this.loadData());
        }
    }

    addCategory() {
        const dialogRef = this.dialog.open(CategoryFormComponent, {
            width: '400px',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.categoryService.createCategory(result).subscribe(() => this.loadData());
            }
        });
    }

    editCategory(category: Category) {
        const dialogRef = this.dialog.open(CategoryFormComponent, {
            width: '400px',
            data: { category }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.categoryService.updateCategory(category.id!, result).subscribe(() => this.loadData());
            }
        });
    }

    deleteCategory(id: number) {
        if (confirm('Are you sure you want to delete this category?')) {
            this.categoryService.deleteCategory(id).subscribe(() => this.loadData());
        }
    }
}
