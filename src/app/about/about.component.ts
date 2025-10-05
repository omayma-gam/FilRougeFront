import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  mission = `Nous connectons les amateurs de cuisine aux meilleurs restaurants de la ville,
    pour commander facilement et déguster où que vous soyez.`;

  values = [
    { icon: 'bi-egg-fried', title: 'Cuisine Authentique', text: 'Des plats faits maison avec des ingrédients frais.' },
    { icon: 'bi-truck', title: 'Livraison Rapide', text: 'Vos repas livrés en un temps record.' },
    { icon: 'bi-heart', title: 'Satisfaction Client', text: 'Nous plaçons votre bonheur au cœur de notre service.' }
  ];

  team = [
    { name: 'Chef Amine', role: 'Chef Cuisinier', img: 'assets/team/amine.jpg' },
    { name: 'Sara B.', role: 'Responsable Qualité', img: 'assets/team/sara.jpg' },
    { name: 'Youssef K.', role: 'Livreur', img: 'assets/team/youssef.jpg' }
  ];
}
