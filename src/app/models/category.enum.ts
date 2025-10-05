export enum Category {
  VEGETARIEN = 'VEGETARIEN',
  VIANDE = 'VIANDE',
  POISSON = 'POISSON',
  DESSERT = 'DESSERT',
  BOISSON = 'BOISSON',
  AUTRE = 'AUTRE',  // Added to match backend enum
  VEGAN = 'VEGAN'  // Added to match backend enum
}

export const CategoryLabels = {
  [Category.VEGETARIEN]: 'Végétarien',
  [Category.VIANDE]: 'Viande', 
  [Category.POISSON]: 'Poisson',
  [Category.DESSERT]: 'Dessert',
  [Category.BOISSON]: 'Boisson',
  [Category.VEGAN]: 'Vegan'
};