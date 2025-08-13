import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // ✅ Pour *ngFor et *ngIf
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  restaurants = [
    { name: 'The Italian Place', location: 'LA RUCHE', img: 'assets/3.jpg' },
    { name: 'Spice Route', location: 'TAMAZIGHTH', img: 'assets/belangerie.jpg' },
    { name: 'The Green Leaf', location: 'MACDO', img: 'assets/food.jpg' },
    { name: "Ocean's Catch", location: 'THE BROTHERS', img: 'assets/espace.jpg' },
    { name: 'The Burger Joint', location: 'CANNELLE', img: 'assets/burger.jpg' },
    { name: 'The French Bistro', location: 'ANWAL', img: 'assets/nature.jpg' },
    { name: 'The Sushi Bar', location: 'LA VILLA', img: 'assets/shawarma.jpg' },
    { name: 'The Mexican Cantina', location: 'Manhattan Plaza', img: 'assets/table vue.jpg' },
  ];
}
