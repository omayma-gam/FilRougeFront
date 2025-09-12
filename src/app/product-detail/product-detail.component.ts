import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product = {
    name: 'burger',
    description: `Notre burger signature avec un steak haché de bœuf juteux, du cheddar fondu, de la laitue croquante, des tomates mûres et notre sauce spéciale, le tout niché dans un pain aux graines de sésame grillé.`,
    image: 'assets/burger.jpg'
  };

  sides = ['Frites', 'Onion Rings', 'Salad'];
  selectedSide: string = '';

  addOns = [
    { name: 'Extra Cheese', selected: false },
    { name: 'Bacon', selected: false },
    { name: 'Avocado', selected: false }
  ];

  specialInstructions = '';

  addToCart() {
    console.log({
      side: this.selectedSide,
      addOns: this.addOns.filter(a => a.selected).map(a => a.name),
      instructions: this.specialInstructions
    });
    alert('Produit ajouté au panier !');
  }
}
