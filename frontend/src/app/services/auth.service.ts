import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _isLoggedIn = signal<boolean>(false);

    isLoggedIn = this._isLoggedIn.asReadonly();

    constructor() {
        
        
    }

    login(token: string) {
        
        this._isLoggedIn.set(true);
    }

    logout() {
        
        this._isLoggedIn.set(false);
    }
}
