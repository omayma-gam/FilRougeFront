import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule, MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule, MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router'; // ✅ Correction ici
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOption } from "@angular/material/core";

@Component({
  selector: 'app-register',
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
    MatOption,
    MatCardActions
],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  roles = ['ADMIN', 'RESTAURATEUR', 'CLIENT'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      role: ['SENDER', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          //this.snackBar.open('Registration successful', 'Close', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        error: () => {
          //this.snackBar.open('Registration failed', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
