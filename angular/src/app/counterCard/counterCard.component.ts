import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-counterCard',
  templateUrl: './counterCard.component.html',
  styleUrl: './counterCard.component.css',
  standalone:true,
  imports: [
    CommonModule,
  ],
})
export class CounterCardComponent {
  @Input() title: string = ''; 
  @Input() count: string = ''; 
}
