import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-info-card',
  imports: [CommonModule],
  templateUrl: './user-info-card.html',
  styleUrl: './user-info-card.scss'
})

export class UserInfoCard {
  @Input() user: any;
}
