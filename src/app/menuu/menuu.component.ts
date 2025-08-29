import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menuu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menuu.component.html',
  styleUrls: ['./menuu.component.css']
})
export class MenuuComponent {
  activeCategory = 'Tous';

  categories = ['Tous', 'Plats', 'Boissons'];

  plats = [
    { name: 'Pizza Margherita', desc: 'Sauce tomate, mozzarella, basilic frais', img: 'assets/piz.jpg', type: 'Plats' },
    { name: 'Pâtes Carbonara', desc: 'Pâtes, œufs, fromage, lardons, poivre noir', img: 'assets/sha.jpg', type: 'Plats' },
    { name: 'Salade César', desc: 'Laitue romaine, croûtons, parmesan, sauce César', img: 'assets/burger2.jpg', type: 'Plats' },
    { name: 'Coca-Cola', desc: 'Boisson gazeuse rafraîchissante', img: 'assets/bois1.jpg', type: 'Boissons' },
    { name: 'Eau Minérale', desc: 'Eau plate ou pétillante', img: 'assets/bois2.jpg', type: 'Boissons' },
  ];

  filteredPlats() {
    if (this.activeCategory === 'Tous') return this.plats;
    return this.plats.filter(p => p.type === this.activeCategory);
  }

  setCategory(cat: string) {
    this.activeCategory = cat;
  }
}