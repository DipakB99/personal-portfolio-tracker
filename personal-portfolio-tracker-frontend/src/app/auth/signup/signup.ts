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


@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    DatePickerModule,
    CommonModule, ToastModule
 ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
  providers: [MessageService],

})
export class Signup {
  signupForm: FormGroup;
  maxDate: Date;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private messageService: MessageService) {
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
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Only image files are allowed.' });
    }
  }

  onSubmit() {
    // if (!this.signupForm.valid || !this.selectedFile) {
    // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Form is invalid or no image selected.' });
    //   return;
    // }

    const formData = new FormData();
    Object.entries(this.signupForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append('profileImage', this.selectedFile!);

    this.http.post('http://localhost:5000/api/signup', formData).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Signup successful!' });
        this.signupForm.reset();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Signup failed. See console.' });
        console.error(err);
      },
    });
  }

  isInvalid(controlName: string): boolean {
  const control = this.signupForm.get(controlName);
  return !!(control && (control.touched || control.dirty) && control.invalid);
}


}
