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
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { environment } from '../../environments/environment';

interface PortfolioPoint {
  date: string;
  value: number;
}


@Component({
  selector: 'app-dashboard',
  imports: [CardModule, CommonModule, ButtonModule, HttpClientModule, DialogModule, DropdownModule, ChartsModule, FormsModule,
    MenubarModule,
    AvatarModule,
   ],
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
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/dashboard'] },
    { label: 'Settings', icon: 'pi pi-cog', routerLink: ['/settings'] }
  ];
  profileImageApiUrl: string;

  constructor(private router: Router, private http: HttpClient) {
    this.profileImageApiUrl = `${environment.apiUrl}/uploads/`;
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<any>(`${environment.apiUrl}/dashboard`, { headers }).subscribe({
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
    this.http.get<PortfolioPoint[]>(`${environment.apiUrl}/chart/portfolio?tenure=${tenure}`)
      .subscribe(data => {
        this.portfolioData = data;
        this.categoryDates = this.portfolioData.map(d => d.date);
        this.portfolioValues = this.portfolioData.map(d => d.value);
      });
  }

}
