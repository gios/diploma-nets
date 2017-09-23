import { Injectable } from '@angular/core';

import {
  IT1,
  IT2,
  IT3,
  IT4,
  IT5,
  IT6,
  CT1,
  CT2,
  CT3,
  PT1,
  PT2,
  PT3,
  PT4
} from './transitions';

import {
  Ingredient1,
  Ingredient2,
  Ingredient3,
  Ingredient4,
  Ingredient5,
  Ingredient6,
  Construction1,
  Construction2,
  Construction3,
  Product1,
  Product2,
  Product3,
  Shop1,
  Shop2,
  Shop3,
  Shop4
} from './pinnacles';

import { link } from './linkConnections';

@Injectable()
export class NetService {

  constructor() { }

  getPinnacles() {
    return [
      Ingredient1,
      Ingredient2,
      Ingredient3,
      Ingredient4,
      Ingredient5,
      Ingredient6,
      Construction1,
      Construction2,
      Construction3,
      Product1,
      Product2,
      Product3,
      Shop1,
      Shop2,
      Shop3,
      Shop4
    ];
  }

  getTransitions() {
    return [
      IT1,
      IT2,
      IT3,
      IT4,
      IT5,
      IT6,
      CT1,
      CT2,
      CT3,
      PT1,
      PT2,
      PT3,
      PT4
    ];
  }

  getLinkedConnections() {
    return [
      link(Ingredient1, IT1),
      link(Ingredient2, IT2),
      link(Ingredient3, IT3),
      link(Ingredient4, IT4),
      link(Ingredient5, IT5),
      link(Ingredient6, IT6),
      link(IT1, Construction1, { label: this.randomNumbers() }),
      link(IT2, Construction2, { label: this.randomNumbers() }),
      link(IT2, Construction3, { label: this.randomNumbers() }),
      link(IT4, Construction1, { label: this.randomNumbers() }),
      link(IT5, Construction1, { label: this.randomNumbers() }),
      link(IT6, Construction2, { label: this.randomNumbers() }),
      link(IT6, Construction3, { label: this.randomNumbers() }),
      link(Construction1, CT1),
      link(Construction2, CT2),
      link(Construction3, CT3),
      link(CT1, Product1, { label: this.randomNumbers() }),
      link(CT2, Product2, { label: this.randomNumbers() }),
      link(CT3, Product3, { label: this.randomNumbers() }),
      link(Product1, PT1, { label: this.randomNumbers() }),
      link(Product2, PT1, { label: this.randomNumbers() }),
      link(Product2, PT2, { label: this.randomNumbers() }),
      link(Product2, PT3, { label: this.randomNumbers() }),
      link(Product3, PT3, { label: this.randomNumbers() }),
      link(Product3, PT4, { label: this.randomNumbers() }),
      link(PT1, Shop1),
      link(PT2, Shop2),
      link(PT3, Shop3),
      link(PT4, Shop4)
    ];
  }

  private randomNumbers() {
    return Math.floor(Math.random() * 1000).toString();
  }
}
