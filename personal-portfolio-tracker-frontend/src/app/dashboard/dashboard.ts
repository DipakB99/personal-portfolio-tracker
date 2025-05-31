import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { FormsModule } from '@angular/forms';

interface PortfolioPoint {
  date: string;
  value: number;
}


@Component({
  selector: 'app-dashboard',
  imports: [CardModule, CommonModule, ButtonModule, HttpClientModule, DialogModule, DropdownModule, ChartsModule, FormsModule ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})

export class Dashboard implements OnInit {
  user: any;
  showPortfolio: any = false;
  portfolioData: PortfolioPoint[] = [];
  selectedTenure = 'Daily';
  tenures = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
  categoryDates: string[] = [];
  portfolioValues: number[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<any>('http://localhost:5000/api/dashboard', { headers }).subscribe({
      next: (res) => {
        this.user = res.user;
      },
      error: () => {
        alert('Session expired. Please login again.');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
    });
    
    this.loadPortfolioData(this.selectedTenure);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  loadPortfolioData(tenure: string) {
    this.http.get<PortfolioPoint[]>(`http://localhost:5000/api/chart/portfolio?tenure=${tenure}`)
      .subscribe(data => {
        this.portfolioData = data;
        this.categoryDates = this.portfolioData.map(d => d.date);
        this.portfolioValues = this.portfolioData.map(d => d.value);
      });
  }

}
