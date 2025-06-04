import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ApiService } from '../../../shared/services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ToastModule, InputTextModule, ButtonModule, ReactiveFormsModule, HttpClientModule, RouterModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  providers: [MessageService, ApiService],
})
export class Login  {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router, 
    private messageService: MessageService,
    private apiService: ApiService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  getFieldLabel(field: string): string {
    const labels: { [key: string]: string } = {
      email: 'Email',
      password: 'Password',
    };
    return labels[field] || field;
  }

  getErrorMessage(fieldName: string): string {
    const control = this.loginForm.get(fieldName);

    if (control && control.touched && control.errors) {
      if (control.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
      }
      if (control.errors['email']) {
        return 'Invalid email format';
      }
      if (control.errors['minlength']) {
        const requiredLength = control.errors['minlength'].requiredLength;
        return `${this.getFieldLabel(fieldName)} must be at least ${requiredLength} characters`;
      }
    }
    return '';
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    
    this.apiService.login(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful.' });
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login failed. Please check your credentials.' });
        console.error(err);
      },
    });
  }
}