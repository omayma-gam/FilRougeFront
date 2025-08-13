import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menuu',
  standalone: true,
  imports: [MatMenuModule, MatToolbarModule, MatButtonModule, CommonModule],
  templateUrl: './menuu.component.html',
  styleUrls: ['./menuu.component.css']
})
export class MenuuComponent {
  activeCategory = 'Tous';

  categories = ['Tous', 'Plats', 'Boissons'];

  plats = [
    { name: 'Pizza Margherita', desc: 'Sauce tomate, mozzarella, basilic frais', img: 'assets/pizza.jpg', type: 'Plats' },
    { name: 'Pâtes Carbonara', desc: 'Pâtes, œufs, fromage, lardons, poivre noir', img: 'assets/carbonara.jpg', type: 'Plats' },
    { name: 'Salade César', desc: 'Laitue romaine, croûtons, parmesan, sauce César', img: 'assets/cesar.jpg', type: 'Plats' },
    { name: 'Coca-Cola', desc: 'Boisson gazeuse rafraîchissante', img: 'assets/coca.jpg', type: 'Boissons' },
    { name: 'Eau Minérale', desc: 'Eau plate ou pétillante', img: 'assets/eau.jpg', type: 'Boissons' },
    { name: 'Jus d\'Orange', desc: 'Jus d’orange fraîchement pressé', img: 'assets/jus-orange.jpg', type: 'Boissons' }
  ];

  filteredPlats() {
    if (this.activeCategory === 'Tous') return this.plats;
    return this.plats.filter(p => p.type === this.activeCategory);
  }

  setCategory(cat: string) {
    this.activeCategory = cat;
  }
}