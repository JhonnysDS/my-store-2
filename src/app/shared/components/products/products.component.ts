import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CreateProductDTO, Product, UpdateProductDTO } from '../../../models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  myShoppingCart: Product[] = [];
 @Input() products: Product[] = [];
 @Input() set productId(id: string | null){
  if(id){
    this.onShowDetail(id)
  }
 }
 @Output() loadMore = new EventEmitter();

  today = new Date();
  date = new Date(2021,1,21);
  showProductDetail= false;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService,
  ) { 
    this.myShoppingCart = this.storeService.getmyShoppingCart()
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
    if(!this.showProductDetail){
      this.showProductDetail = true;
    }
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

  // loadMore(){
  //   this.productsService.getProductsByPage(this.limit, this.offset)
  //   .subscribe(data => {
  //     this.products = this.products.concat(data);
  //     this.offset += this.limit;
  //   })
  // }



  readAndUpdate(id: string){
    this.productsService.getProduct(id)
    .pipe(
      switchMap((product) => this.productsService.update(product.id, {title: 'change'}))
    )
    .subscribe(data =>{
      console.log(data)
    });
    this.productsService.fetchReadAndUpdate(id, {title: 'change'})
    .subscribe(response => {
      const read = response[0];
      const update = response[1];
    })
  }

  onLoadMore(){
    this.loadMore.emit();
  }
}

