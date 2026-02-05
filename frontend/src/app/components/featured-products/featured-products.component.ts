import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { animate, style, transition, trigger, keyframes } from '@angular/animations';

@Component({
    selector: 'app-featured-products',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule],
    templateUrl: './featured-products.component.html',
    styleUrl: './featured-products.component.scss',
    animations: [
        trigger('slideAnimation', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('800ms ease-out', style({ opacity: 1 }))
            ]),
            transition(':leave', [
                animate('800ms ease-in', style({ opacity: 0 }))
            ])
        ]),
        trigger('textAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(50px)' }),
                animate('800ms 300ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ]),
        trigger('imageAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateX(50px)' }),
                animate('1000ms 200ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateX(0)' }))
            ])
        ])
    ]
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
    featuredProducts: Product[] = [];
    currentIndex = 0;
    intervalId: any;

    constructor(
        private productService: ProductService,
        private cartService: CartService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(products => {
            // Get the last 5 products (assuming higher ID means newer)
            // Sort by ID descending first just to be safe, or just slice from end if array is naturally ordered
            // Let's sort to be sure
            this.featuredProducts = products.sort((a, b) => b.id - a.id).slice(0, 5);

            this.startSlideShow();
        });
    }

    ngOnDestroy(): void {
        this.stopSlideShow();
    }

    startSlideShow() {
        if (isPlatformBrowser(this.platformId)) {
            this.intervalId = setInterval(() => {
                this.nextSlide();
            }, 5000); // Change every 5 seconds
        }
    }

    stopSlideShow() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.featuredProducts.length;
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.featuredProducts.length) % this.featuredProducts.length;
        this.resetTimer();
    }

    goToSlide(index: number) {
        this.currentIndex = index;
        this.resetTimer();
    }

    resetTimer() {
        this.stopSlideShow();
        this.startSlideShow();
    }

    addToCart(product: Product) {
        this.cartService.addToCart(product, 1);
    }
}
