import { Component } from '@angular/core';
import { ProcessService } from '../../services/process.service';

@Component({
  standalone: true,
  templateUrl: './reports.html',
  
  styleUrl: './reports.css',
})
export class ReportsComponent {
  constructor(readonly service: ProcessService) {}
  get completionRate(): number { return this.service.total ? Math.round(this.service.completed / this.service.total * 100) : 0; }
  barHeight(value: number): number { return Math.min(100, value / 6 * 100); }
}
