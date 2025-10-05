import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menuu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menuu.component.html',
  styleUrls: ['./menuu.component.css']
})
export class MenuuComponent implements OnInit {
  filteredPlats: any[] = [];
  isLoading = false;
  error = '';
  searchTerm = '';
  activeCategory = 'Tous';
  categories = ['Tous', 'VEGETARIEN', 'VEGAN', 'VIANDE', 'POISSON', 'DESSERT', 'BOISSON'];
  restaurantName = 'Restaurant';

  constructor() {}

  ngOnInit(): void {
    // Simplified - no external service calls
    this.filteredPlats = [
      {
        id: 1,
        name: 'Pizza Margherita',
        description: 'Pizza traditionnelle avec tomates et mozzarella',
        prix: 12.50,
        category: 'VIANDE',
        available: true,
        photo: 'assets/default-food.jpg'
      },
      {
        id: 2,
        name: 'Salade César',
        description: 'Salade fraîche avec croûtons et parmesan',
        prix: 9.90,
        category: 'VEGETARIEN',
        available: true,
        photo: 'assets/default-food.jpg'
      }
    ];
  }

  setCategory(category: string): void {
    this.activeCategory = category;
  }

  onSearchChange(): void {
    // Simple search implementation
  }

  getCategoryLabel(category: string): string {
    return category;
  }
}
