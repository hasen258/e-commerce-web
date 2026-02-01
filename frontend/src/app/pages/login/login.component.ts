import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule if using ngModel, though not strictly needed here if just a button

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ensure imports are correct
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  passwordVisible = false;

  constructor(private authService: AuthService, private router: Router) { }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  // Simulating login for demo purposes
  onLogin() {
    this.authService.login('fake-jwt-token');
    this.router.navigate(['/']); // Redirect to home
  }
}
