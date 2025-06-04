import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Toast],
  providers: [MessageService],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'personal-portfolio-tracker-frontend';
}
