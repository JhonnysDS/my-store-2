import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';


import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from '../shared/components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighLightDirective } from '../shared/directives/high-light.directive';


@NgModule({
  declarations: [
    HighLightDirective,
    TimeAgoPipe,
    ReversePipe,
    ProductsComponent,
    ProductComponent,
    ImgComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule

  ], 
  exports: [
    HighLightDirective,
    TimeAgoPipe,
    ReversePipe,
    ProductsComponent,
    ProductComponent,
    ImgComponent
  ]
})
export class SharedModule { }
