import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];
  products: Product[] = [];

  constructor(
    private storeService: StoreService,
    private productService: ProductsService,
  ) { 
    this.myShoppingCart = this.storeService.getmyShoppingCart()
  }

  ngOnInit(): void {
    this.productService.getAllProducts()
    .subscribe(data => {
      this.products = data;
    })
  }
  total = 0;

  onAddToShoppingCart(product: Product){
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

}
