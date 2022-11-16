import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import { CreateProductDTO, Product } from '../../models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';
import { id } from 'date-fns/locale';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];
  products: Product[] = [];
  today = new Date();
  date = new Date(2021,1,21);
  showProductDetail= false;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService,
  ) { 
    this.myShoppingCart = this.storeService.getmyShoppingCart()
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data => {
      this.products = data;
    })
  }
  total = 0;

  onAddToShoppingCart(product: Product){
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail
  }

  onShowDetail(id: string){
    this.productsService.getProduct(id)
    .subscribe(data => {
      this.toggleProductDetail();
      this.productChosen = data;
    })
  }

  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: ''
    },
    description: ''
  }

  createNewProduct(){
    const product: CreateProductDTO ={
      title: 'Producto Nuevo JD',
      description: 'Bla Vla Bla',
      images: ['https://placeimg.com/640/480/any?random=$%7BMath.random()%7D'],
      price: 150,
      categoryId: 2,
    }
    this.productsService.create(product)
    .subscribe(data => {
      this.products.unshift(data);
    });
  }
}
