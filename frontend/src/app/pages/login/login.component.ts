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
  isLoginMode = true; // Toggle between Login and Signup

  formData = {
    name: '',
    email: '',
    password: '',
    phone: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  loginWithGoogle() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.authService.login({ email: this.formData.email, password: this.formData.password }).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          alert('Login failed: ' + (err.error?.error || 'Invalid credentials'));
        }
      });
    } else {
      this.authService.signup(this.formData).subscribe({
        next: () => {
          alert('Signup successful! Please login.');
          this.isLoginMode = true;
        },
        error: (err) => {
          alert('Signup failed: ' + (err.error?.message || 'Unknown error'));
        }
      });
    }
  }
}
