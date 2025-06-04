import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { ApiService } from '../../../shared/services/api';

export interface GraphDataPoint {
  date: string;
  equity: number;
  debt: number;
  commodity: number;
}


@Component({
  selector: 'app-portfolio-allocation-chart',
  imports: [ChartsModule, CommonModule ],
  providers: [ApiService],
  templateUrl: './portfolio-allocation-chart.html',
  styleUrl: './portfolio-allocation-chart.scss'
})


export class PortfolioAllocationChartComponent implements OnInit {
  tenureOptions = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
  selectedTenure = 'Daily';

  graphData: GraphDataPoint[] = [];
  categories: string[] = [];
  equitySeries: number[] = [];
  debtSeries: number[] = [];
  commoditySeries: number[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPortfolioData(this.selectedTenure);
  }

  loadPortfolioData(tenure: string): void {
    this.selectedTenure = tenure;

    this.apiService.getPortfolioData(tenure).subscribe((data: GraphDataPoint[]) => {
      this.graphData = data;

      this.categories = data.map(d => d.date);
      this.equitySeries = data.map(d => d.equity);
      this.debtSeries = data.map(d => d.debt);
      this.commoditySeries = data.map(d => d.commodity);
    });
  }

}
