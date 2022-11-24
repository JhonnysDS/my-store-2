import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/Http';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';
import { catchError, map, retry, } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { throwError, zip } from 'rxjs';
import { checkTime  } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api`;
  
  constructor(
    private http: HttpClient,

  ) { }

  getByCategory(categoryId: string, limit?:number, offset?: number){
    let params = new HttpParams();
    if (limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, {params})
  }

  getAllProducts(limit?:number, offset?: number){
    let params = new HttpParams();
    if (limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {params, context: checkTime()})
    .pipe(
      retry(3),
    );
  }

  getProduct(id: string){
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict){
          return throwError('Algo está fallando en el server')
        }
        if (error.status === HttpStatusCode.NotFound){
          return throwError('El producto no existe')
        }
        if (error.status === HttpStatusCode.Unauthorized){
          return throwError('no tienes permiso para estar aqui')
        }
        return throwError('ups algo salió mal')
      })
    )

  }

  create(dto: CreateProductDTO){
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  update(id: string, dto: UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  delete(id: string){
    return this.http.delete<Boolean>(`${this.apiUrl}/products/${id}`)
  }


  getProductsByPage(limit:number, offset: number){
    return this.http.get<Product[]>(`${this.apiUrl}`,{ 
    params: {limit, offset}
  })
  .pipe(
    retry(2),
    map(products => products.map(item => {
      return{
        ...item,
        taxes: .19 * item.price
      }
    }))
  );;
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO){
    return zip(
      this.getProduct(id),
      this.update(id, dto)
    )
  }

}
