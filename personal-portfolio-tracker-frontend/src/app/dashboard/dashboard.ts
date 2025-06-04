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
import { MenuItem, MessageService } from 'primeng/api';
import { environment } from '../../environments/environment';
import { ApiService } from '../../shared/services/api';
import { UserInfoCard } from '../../shared/dumb-components/user-info-card/user-info-card';
import { PortfolioAllocationChartComponent } from './portfolio-allocation-chart/portfolio-allocation-chart';
import { DataCard } from "../../shared/dumb-components/data-card/data-card";
import dashbaordCradsData  from '../../shared/data-files/dashboardCardsData.json';

interface PortfolioPoint {
  date: string;
  value: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [CardModule, CommonModule, ButtonModule, HttpClientModule, DialogModule, DropdownModule, ChartsModule, FormsModule,
    MenubarModule, AvatarModule, UserInfoCard, PortfolioAllocationChartComponent, DataCard],
  providers: [ApiService, MessageService],
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
    { label: 'View Portfolio', icon: 'pi pi-cog', command: (event) => this.showPortfolio = true },
    { label: 'Settings', icon: 'pi pi-cog', routerLink: ['/settings'] }
  ];
  profileImageApiUrl: string;
  dashboardCards: any[] = dashbaordCradsData;

  constructor(private router: Router, private http: HttpClient, private apiService: ApiService, private messageService: MessageService) {
    this.profileImageApiUrl = `https://personal-portfolio-tracker-backend.onrender.com/uploads/`;
  }

  ngOnInit() {
    this.apiService.getDashboardData().subscribe({
      next: (res) => {
        this.user = res.user;
      },
      error: () => {
        alert('Session expired. Please login again.');
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Session expired, please login again.' });
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
    });
    
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
