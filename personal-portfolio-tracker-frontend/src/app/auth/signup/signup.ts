import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    DatePickerModule
 ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {
  signupForm: FormGroup;
  maxDate: Date;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
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
      alert('Only image files are allowed.');
    }
  }

  onSubmit() {
    // if (!this.signupForm.valid || !this.selectedFile) {
    //   alert('Form is invalid or no image selected.');
    //   return;
    // }

    const formData = new FormData();
    Object.entries(this.signupForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append('profileImage', this.selectedFile!);

    this.http.post('http://localhost:5000/api/signup', formData).subscribe({
      next: (res) => {
        alert('Signup successful!');
        this.signupForm.reset();
      },
      error: (err) => {
        alert('Signup failed. See console.');
        console.error(err);
      },
    });
  }
}
