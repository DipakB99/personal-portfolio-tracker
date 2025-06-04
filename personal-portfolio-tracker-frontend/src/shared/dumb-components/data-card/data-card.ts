import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-card',
  imports: [CommonModule],
  templateUrl: './data-card.html',
  styleUrl: './data-card.scss'
})
export class DataCard {
  @Input() card: any;
}
