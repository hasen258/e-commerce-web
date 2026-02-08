import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './guards/admin.guard';

import { SearchPageComponent } from './pages/search/search.component';

import { LoginSuccessComponent } from './pages/login-success/login-success.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login-success', component: LoginSuccessComponent },
    { path: 'search', component: SearchPageComponent },
    {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [adminGuard]
    },
    { path: '**', redirectTo: '' }
];
