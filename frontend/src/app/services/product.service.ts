import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getOptions() {
    const token = this.authService.getCookie('token');
    if (token) {
      return {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
    }
    return {};
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, this.getOptions());
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`, this.getOptions());
  }

  createProduct(product: Product, image?: File): Observable<Product> {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], {
      type: 'application/json'
    }));
    if (image) {
      formData.append('image', image);
    }
    return this.http.post<Product>(this.apiUrl, formData, this.getOptions());
  }

  updateProduct(id: number, product: Product, image?: File): Observable<Product> {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], {
      type: 'application/json'
    }));
    if (image) {
      formData.append('image', image);
    }
    return this.http.put<Product>(`${this.apiUrl}/${id}`, formData, this.getOptions());
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getOptions());
  }
}
