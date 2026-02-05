import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private apiUrl = 'http://localhost:8080/api/categories';

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

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiUrl);
    }

    getRootCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiUrl + "/root");
    }

    getCategory(id: number): Observable<Category> {
        return this.http.get<Category>(`${this.apiUrl}/${id}`, this.getOptions());
    }

    createCategory(category: Category): Observable<Category> {
        return this.http.post<Category>(this.apiUrl, category, this.getOptions());
    }

    updateCategory(id: number, category: Category): Observable<Category> {
        return this.http.put<Category>(`${this.apiUrl}/${id}`, category, this.getOptions());
    }

    deleteCategory(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getOptions());
    }
}
