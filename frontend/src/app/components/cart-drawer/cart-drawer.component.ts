import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-cart-drawer',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: './cart-drawer.component.html',
    styleUrl: './cart-drawer.component.scss'
})
export class CartDrawerComponent {
    isOpen = false;

    constructor(
        public cartService: CartService,
        private authService: AuthService,
        private router: Router
    ) { }

    toggle() {
        this.isOpen = !this.isOpen;
    }

    close() {
        this.isOpen = false;
    }

    increase(item: any) {
        this.cartService.updateQuantity(item.product.id, item.quantity + 1);
    }

    decrease(item: any) {
        this.cartService.updateQuantity(item.product.id, item.quantity - 1);
    }

    remove(item: any) {
        this.cartService.removeFromCart(item.product.id);
    }

    confirmOrder() {
        if (!this.authService.isLoggedIn()) {
            alert('Please login to continue');
            this.close();
            this.router.navigate(['/login']);
            return;
        }

        // Proceed with order confirmation
        alert('Order confirmed! Total: $' + this.cartService.totalCost());
        this.cartService.clearCart();
        this.close();
    }
}
