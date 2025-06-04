import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../shared/services/api';


@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    DatePickerModule,
    CommonModule, ToastModule, RouterModule
 ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
  providers: [MessageService, ApiService],

})
export class Signup {
  signupForm: FormGroup;
  maxDate: Date;
  selectedFile: File | null = null;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private messageService: MessageService, private router: Router, private apiService: ApiService) {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18); // User must be at least 18

    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      dob: ['', Validators.required],
    });
  }

  onFileChange(event: any) {
    console.log('heyyyyyyyyyyyy',this.signupForm.valid)
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Only image files are allowed.' });
    }
  }

  onSubmit() {
    if (!this.signupForm.valid || !this.selectedFile) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Form is invalid or no image selected.' });
      return;
    }

    const formData = new FormData();
    Object.entries(this.signupForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append('profileImage', this.selectedFile!);

    this.apiService.signup(formData).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'Signup successful!', detail: res });
        this.router.navigate(['/login'])
        this.signupForm.reset();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Signup failed.' });
        console.error(err);
      },
    });
  }

  getFieldLabel(field: string): string {
    const labels: { [key: string]: string } = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      password: 'Password',
      mobile: 'Mobile number',
      dob: 'Date of birth',
    };
    return labels[field] || field;
  }

  getErrorMessage(fieldName: string): string {
    const control = this.signupForm.get(fieldName);

    if (control && control.touched && control.errors) {
      if (control.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
      }

      if (control.errors['pattern']) {
        if (fieldName === 'firstName' || fieldName === 'lastName') {
          return `${this.getFieldLabel(fieldName)} is invalid, containing numbers`;
        }
        if (fieldName === 'mobile') {
          return 'Mobile number must contain digits only';
        }
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

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}
