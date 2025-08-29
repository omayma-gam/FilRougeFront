import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule, MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatFormFieldModule, MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { AuthService } from '../Services/auth.service';
import { Router, RouterModule } from '@angular/router'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatIcon,
    MatError,
    MatCardActions
],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // ✅ 'styleUrls' au pluriel
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // initialisation garantie ici
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.snackBar.open('Login successful', 'Close', { duration: 3000 });
          this.router.navigate(['/home']);
        },
        error: () => {
          this.snackBar.open('Invalid credentials', 'Close', { duration: 3000 });
        }
      });
    }
  }

  // getters pour template
  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  // getter utile pour le template -> évite l'accès direct à .valid
  get isFormValid(): boolean {
    return this.loginForm?.valid ?? false;
  }

}
