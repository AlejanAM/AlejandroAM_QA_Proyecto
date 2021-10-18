import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PassDataService {

  listMarket = [];

  listItemCount = new BehaviorSubject(0);

  constructor() { }

  getList(){
    for (let p of this.listMarket) {
      if (p.cantidad == 0) {
        p.cantidad = 1;
      }
    }
    return this.listMarket;
  }

  getItemCount(){
    return this.listItemCount;
  }

  addProduct(product){
    let added = false;
    for (let p of this.listMarket) {
      if (p.name === product.name) {
        p.cantidad += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      this.listMarket.push(product);
    }
    this.listItemCount.next(this.listItemCount.value + 1);
  }

  decreaseProduct(product){
    for (let [index, p] of this.listMarket.entries()) {
      if (p.name === product.name) {
        p.cantidad -= 1;
        if (p.cantidad == 0) {
          this.listMarket.splice(index,1);
        }
      }
    }
    this.listItemCount.next(this.listItemCount.value - 1);
  }

  removeProduct(product){
    for (let [index, p] of this.listMarket.entries()) {
      if (p.name === product.name) {
          this.listItemCount.next(this.listItemCount.value - p.cantidad);
          p.cantidad = 1;
          this.listMarket.splice(index,1);
      }
    }
  }

}
