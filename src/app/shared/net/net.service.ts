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
  PT4,
  RT1,
  RT2,
  RT3
} from './transitions';

import {
  State1,
  State2,
  State3,
  State4,
  State5,
  State6,
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
  Shop4,
  Remainder1,
  Remainder2,
  Remainder3
} from './pinnacles';

import { link } from './linkConnections';

@Injectable()
export class NetService {

  constructor() { }

  getPinnacles() {
    return [
      State1,
      State2,
      State3,
      State4,
      State5,
      State6,
      Ingredient1,
      Ingredient2,
      Ingredient3,
      Ingredient4,
      Ingredient5,
      Ingredient6,
      Construction1,
      Construction2,
      Construction3,
      // Product1,
      // Product2,
      // Product3,
      // Shop1,
      // Shop2,
      // Shop3,
      // Shop4,
      // Remainder1,
      // Remainder2,
      // Remainder3
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
      PT4,
      RT1,
      RT2,
      RT3
    ];
  }

  getLinkedConnections() {
    return [
      link(State1, IT1),
      link(State2, IT2),
      link(State3, IT3),
      link(State4, IT4),
      link(State5, IT5),
      link(State6, IT6),

      link(IT1, State1),
      link(IT2, State2),
      link(IT3, State3),
      link(IT4, State4),
      link(IT5, State5),
      link(IT6, State6),

      link(IT1, Ingredient1, { label: this.randomNumbers() }),
      link(IT2, Ingredient2, { label: this.randomNumbers() }),
      link(IT3, Ingredient3, { label: this.randomNumbers() }),
      link(IT4, Ingredient4, { label: this.randomNumbers() }),
      link(IT5, Ingredient5, { label: this.randomNumbers() }),
      link(IT6, Ingredient6, { label: this.randomNumbers() }),

      link(Ingredient1, CT1),
      link(Ingredient2, CT2),
      link(Ingredient2, CT3),
      link(Ingredient3, CT1),
      link(Ingredient4, CT1),
      link(Ingredient5, CT1),
      link(Ingredient6, CT2),
      link(Ingredient6, CT3),
      link(CT1, Construction1),
      link(CT2, Construction2),
      link(CT3, Construction3),
      // link(CT1, Product1, { label: this.randomNumbers() }),
      // link(CT2, Product2, { label: this.randomNumbers() }),
      // link(CT3, Product3, { label: this.randomNumbers() }),
      // link(Product1, PT1, { label: this.randomNumbers() }),
      // link(Product2, PT1, { label: this.randomNumbers() }),
      // link(Product2, PT2, { label: this.randomNumbers() }),
      // link(Product2, PT3, { label: this.randomNumbers() }),
      // link(Product3, PT3, { label: this.randomNumbers() }),
      // link(Product3, PT4, { label: this.randomNumbers() }),
      // link(PT1, Shop1),
      // link(PT2, Shop2),
      // link(PT3, Shop3),
      // link(PT4, Shop4),
      // link(Product1, RT1, { label: this.randomNumbers() }),
      // link(Product2, RT2, { label: this.randomNumbers() }),
      // link(Product3, RT3, { label: this.randomNumbers() }),
      // link(RT1, Remainder1),
      // link(RT2, Remainder2),
      // link(RT3, Remainder3)
    ];
  }

  private randomNumbers() {
    return Math.ceil(Math.random() * 1000).toString();
  }
}
