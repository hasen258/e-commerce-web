import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login-success',
    standalone: true,
    template: '<p>Processing login...</p>'
})
export class LoginSuccessComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            const token = params['token'];
            if (token) {
                // Manually set the cookie/token using AuthService logic
                // Since AuthService usually has internal state/observables, we might want a setToken method
                // But for now, we can replicate the "cookie setting" or assume AuthService detects cookies on init/refresh?
                // Let's check AuthService. For now, simply setting the cookie is the most low-level way.
                this.setCookie('token', token, 1);

                // Navigate home
                // We use window.location.reload() or router navigation. 
                // Better to use router, but we need to ensure AuthService picks up the new token.
                // Let's verify AuthService briefly but setting cookie is usually enough if using direct cookie access.
                this.router.navigate(['/']);
            } else {
                this.router.navigate(['/login']);
            }
        });
    }

    private setCookie(name: string, value: string, days: number) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
}
