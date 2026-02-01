import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-add-to-cart-modal',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './add-to-cart-modal.component.html',
    styleUrl: './add-to-cart-modal.component.scss'
})
export class AddToCartModalComponent {
    @Input() product: any;
    @Output() confirm = new EventEmitter<number>();
    @Output() cancel = new EventEmitter<void>();

    quantity: number = 1;

    onConfirm() {
        this.confirm.emit(this.quantity);
    }

    onCancel() {
        this.cancel.emit();
    }

    increase() {
        this.quantity++;
    }

    decrease() {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }
}
