import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
    selector: 'app-search-bar',
    standalone: true,
    imports: [CommonModule, FormsModule, MatIconModule],
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit {
    @Input() searchQuery: string = '';
    @Input() selectedCategoryId: string = 'all'; // using string to handle 'all' easily

    categories: Category[] = [];

    constructor(
        private categoryService: CategoryService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.categoryService.getCategories().subscribe({
            next: (cats) => this.categories = cats,
            error: (err) => console.error('Failed to load categories', err)
        });
    }

    onSearch() {
        const queryParams: any = {};
        if (this.searchQuery && this.searchQuery.trim() !== '') {
            queryParams.q = this.searchQuery;
        }
        if (this.selectedCategoryId && this.selectedCategoryId !== 'all') {
            queryParams.category = this.selectedCategoryId;
        }

        this.router.navigate(['/search'], { queryParams });
    }
}
