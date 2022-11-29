import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  limit= 10;
  offset= 0;
  products: Product[] = [];
  constructor(

    private route: ActivatedRoute,
    private productsService: ProductsService,

  ) { }

  categoryId: string | null = null;
  productId: string | null = null;

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params =>{
          this.categoryId =  params.get('id')
          if(this.categoryId){
            return this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
          }
          return []
        })
    )
    .subscribe(data =>{
        this.products = data;
      });

      this.route.queryParamMap.subscribe(params => {
        this.productId = params.get('product');
        console.log(this.productId);
      })
  }

}
