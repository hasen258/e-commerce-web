import { Injectable, computed, signal } from '@angular/core';

export interface CartItem {
    product: any;
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    cartItems = signal<CartItem[]>([]);

    totalItems = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));
    totalCost = computed(() => this.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0));

    constructor() { }

    addToCart(product: any, quantity: number) {
        const currentItems = this.cartItems();
        const existingItemIndex = currentItems.findIndex(item => item.product.id === product.id);

        if (existingItemIndex > -1) {
            // Create a new array reference for the signal to update
            const updatedItems = [...currentItems];
            updatedItems[existingItemIndex].quantity += quantity;
            this.cartItems.set(updatedItems);
        } else {
            this.cartItems.set([...currentItems, { product, quantity }]);
        }
    }

    removeFromCart(productId: any) {
        this.cartItems.set(this.cartItems().filter(item => item.product.id !== productId));
    }

    clearCart() {
        this.cartItems.set([]);
    }

    updateQuantity(productId: any, quantity: number) {
        const currentItems = this.cartItems();
        const index = currentItems.findIndex(item => item.product.id === productId);
        if (index > -1) {
            const updatedItems = [...currentItems];
            if (quantity <= 0) {
                updatedItems.splice(index, 1);
            } else {
                updatedItems[index].quantity = quantity;
            }
            this.cartItems.set(updatedItems);
        }
    }
}
