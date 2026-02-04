import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { AddToCartModalComponent } from '../add-to-cart-modal/add-to-cart-modal.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, AddToCartModalComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;
  selectedProduct: any | null = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService // Injected CartService
  ) { }

  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }

  openAddToCart(product: any) {
    this.selectedProduct = product;
  }

  onAddToCartConfirm(quantity: number) {
    if (this.selectedProduct) {
      this.cartService.addToCart(this.selectedProduct, quantity); // Updated to call cartService
      this.selectedProduct = null;
    }
  }

  onAddToCartCancel() {
    this.selectedProduct = null;
  }
}
