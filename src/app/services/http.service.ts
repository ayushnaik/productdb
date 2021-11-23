import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../Category';
import { Products } from '../Products';
import { Router } from '@angular/router';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public categories: any = [];
  public product: any = [];
  apiURL = env.BASE_URL;

  constructor(private http: HttpClient, private router: Router) { }

  postCategory(newCategory = new Category()) {
    this.http.post(this.apiURL+'/category', newCategory).subscribe(
      (resp: any) => {
        console.log(resp);
      },
      err => console.log(err)
    )
  }

  getAllCategory() {
    return this.http.get<Category[]>(this.apiURL+'/category')
  }

  updateCategory(category = new Category()) {
    return this.http.put(this.apiURL+'/category/'+category._id, category).subscribe(
      (resp: any) => {
        console.log(resp);
      },
      err => console.log(err)
    )
  }

  delCategory(catId: String) {
    return this.http.delete(this.apiURL+'/category/'+catId)
  }

  postProduct(newProducts = new Products()) {
    this.http.post(this.apiURL+'/product', newProducts).subscribe(
      (resp: any) => {
        console.log(resp);
      },
      err => console.log(err)
    )
  }

  getProductCategory(productId: String) {
    return this.http.get<Products[]>(this.apiURL+'/product/cat/'+productId)
  }

  updateProduct(product = new Products()) {
    this.http.put(this.apiURL+'/product/'+product._id, product).subscribe(
      (resp: any) => {
        console.log(resp);
      },
      err => console.log(err)
    )
  }

  getAllProduct() {
    return this.http.get<Products[]>(this.apiURL+'/product')
  }

  delProduct(productId: String) {
    return this.http.delete(this.apiURL+'/product/'+productId)
  }
}
