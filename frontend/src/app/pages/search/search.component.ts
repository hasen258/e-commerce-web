import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Observable, switchMap, map } from 'rxjs';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';

@Component({
    selector: 'app-search-page',
    standalone: true,
    imports: [CommonModule, SearchBarComponent, ProductListComponent],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss'
})
export class SearchPageComponent implements OnInit {
    filteredProducts$!: Observable<Product[]>;
    currentQuery: string = '';
    currentCategory: string = 'all';

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService
    ) { }

    ngOnInit() {
        // Create observables for the template to bind to directly
        const params$ = this.route.queryParams;

        // This observable is for the product list (async pipe in template)
        this.filteredProducts$ = params$.pipe(
            switchMap(params => {
                const query = (params['q'] || '').toLowerCase();
                const category = params['category'] || 'all';

                // Use backend filtering for category, then client-side filtering for text
                return this.productService.getProducts(category).pipe(
                    map(products => products.filter(p =>
                        !query || p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
                    ))
                );
            })
        );

        // Subscribe to params separately to update local state for the SearchBar inputs
        // using setTimeout to push the update to the next tick, avoiding the error
        params$.subscribe(params => {
            setTimeout(() => {
                this.currentQuery = params['q'] || '';
                this.currentCategory = params['category'] || 'all';
            });
        });
    }
}
