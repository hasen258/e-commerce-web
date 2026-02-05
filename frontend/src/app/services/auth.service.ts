import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/auth';
    private _isLoggedIn = signal<boolean>(this.hasToken());
    private _isAdmin = signal<boolean>(false);

    isLoggedIn = this._isLoggedIn.asReadonly();
    isAdmin = this._isAdmin.asReadonly();

    constructor(private http: HttpClient) {
        this.checkAdminStatus();
    }

    login(credentials: any): Observable<any> {
        return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                if (response.token) {
                    this.setToken(response.token);
                    this._isLoggedIn.set(true);
                    this.checkAdminStatus();
                }
            })
        );
    }

    signup(customerData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/signup`, customerData);
    }

    logout() {
        this.eraseCookie('token');
        this._isLoggedIn.set(false);
        this._isAdmin.set(false);
    }

    private setToken(token: string) {
        this.setCookie('token', token, 1); // 1 day
    }

    private hasToken(): boolean {
        return !!this.getCookie('token');
    }

    private checkAdminStatus() {
        const token = this.getCookie('token');
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                const roles = decoded.roles || [];
                const isAdmin = roles.some((r: any) => r.authority === 'ROLE_ADMIN' || r === 'ROLE_ADMIN');
                this._isAdmin.set(isAdmin);
            } catch (e) {
                console.error('Failed to decode token', e);
                this._isAdmin.set(false);
            }
        } else {
            this._isAdmin.set(false);
        }
    }

    // Cookie Helpers
    private setCookie(name: string, value: string, days: number) {
        if (typeof document === 'undefined') return;
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Strict";
    }

    getCookie(name: string): string | null {
        if (typeof document === 'undefined') return null;
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    private eraseCookie(name: string) {
        if (typeof document === 'undefined') return;
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}
