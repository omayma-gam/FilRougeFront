import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  restaurantName = "Restaurant Name";
  items = [
    { name: 'Spicy Chicken Burger', quantity: 1, price: 15, image: 'assets/burger2.jpg' },
    { name: 'Fries', quantity: 2, price: 5, image: 'assets/fries.jpg' }
  ];
  paymentMethod = "Visa •••• 4567";
  subtotal = 25;
  deliveryFee = 5;
  get total() {
    return this.subtotal + this.deliveryFee;
  }
}
