import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]),
    new Recipe('A delicious Sandwich',
      'What else you need to say?',
      'https://unsplash.com/search/photos/sandwich?photo=sHG1dCUXgPY',
      [
        new Ingredient('bread', 2),
        new Ingredient('tomatoes', 1),
        new Ingredient('onions', 1)
      ]),
    new Recipe('The crunchy Fries',
      'Wow, Yummy?',
      'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiokZ7z5vDVAhULfiYKHab6AEUQjRwIBw&url=http%3A%2F%2Ffood.ndtv.com%2Ftopic%2Fsandwich%2Farticles&psig=AFQjCNEIyeB0gEr8min4m18yT6Ux9EeyNA&ust=1503696043759060',
      [
        new Ingredient('potatoes', 2),
        new Ingredient('ketchup', 1)
      ]),
    new Recipe('The yummy sub',
      'Wooo!!! So long?',
      'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiR44md5_DVAhUBTiYKHWV5CmgQjRwIBw&url=https%3A%2F%2Fwww.usatoday.com%2Fstory%2Fmoney%2Fnation-now%2F2017%2F07%2F24%2Fmove-over-venison-sandwich-arbys-new-porchetta-sandwich-has-15th-century-roots%2F498875001%2F&psig=AFQjCNEIyeB0gEr8min4m18yT6Ux9EeyNA&ust=1503696043759060',
      [
        new Ingredient('bread', 2),
        new Ingredient('Meat', 1),
        new Ingredient('Onions', 1),
        new Ingredient('Tomatoes', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
