import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GraphDataPoint } from '../../app/dashboard/portfolio-allocation-chart/portfolio-allocation-chart';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/login`, data);
  }

  signup(formData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/signup`, formData);
  }

  // todo flag: adding token inside interceptor
  getDashboardData(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/dashboard`);
  }

  getPortfolioData(tenure: string): Observable<GraphDataPoint[]> {
    return this.http.get<GraphDataPoint[]>(`${environment.apiUrl}/chart/portfolio?tenure=${tenure}`);
  }
}
