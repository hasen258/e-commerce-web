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
        this.filteredProducts$ = this.route.queryParams.pipe(
            switchMap(params => {
                const query = (params['q'] || '').toLowerCase();
                const category = params['category'] || 'all';

                this.currentQuery = params['q'] || '';
                this.currentCategory = category;

                return this.productService.getProducts(category).pipe(
                    map(products => products.filter(p =>
                        !query || p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
                    ))
                );
            })
        );
    }
}
