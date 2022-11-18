import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import { CreateProductDTO, Product, UpdateProductDTO } from '../../models/product.model';
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
  limit= 10;
  offset= 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService,
  ) { 
    this.myShoppingCart = this.storeService.getmyShoppingCart()
  }

  ngOnInit(): void {
    this.productsService.getProductsByPage(10, 0)
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
    this.statusDetail = 'loading';
    this.toggleProductDetail();
    this.productsService.getProduct(id)
    .subscribe(data => {
      this.productChosen = data;
      this.statusDetail = 'success';
    }, errorMsg => {
      window.alert(errorMsg);
      this.statusDetail = 'error';
    } )
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

  updateProduct(){
    const changes: UpdateProductDTO = {
      title: 'New title',
      description: 'New description',
      price: 250,
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes)
    .subscribe(data =>{
      const productIndex = this.products.findIndex(item => item.id === id)
      this.products[productIndex]= data;
    })
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === id)
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    })
  }

  loadMore(){
    this.productsService.getProductsByPage(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    })
  }
}
