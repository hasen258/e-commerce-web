import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/auth';
    private _isLoggedIn = signal<boolean>(this.hasToken());

    isLoggedIn = this._isLoggedIn.asReadonly();

    constructor(private http: HttpClient) { }

    login(credentials: any): Observable<any> {
        return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                if (response.token) {
                    this.setToken(response.token);
                    this._isLoggedIn.set(true);
                }
            })
        );
    }

    signup(customerData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/signup`, customerData);
    }

    logout() {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('token');
        }
        this._isLoggedIn.set(false);
    }

    private setToken(token: string) {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('token', token);
        }
    }

    private hasToken(): boolean {
        if (typeof localStorage !== 'undefined') {
            return !!localStorage.getItem('token');
        }
        return false;
    }
}
