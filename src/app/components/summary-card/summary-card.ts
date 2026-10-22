import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  templateUrl: './summary-card.html',
  styleUrl: './summary-card.css',
})
export class SummaryCardComponent {
  @Input({ required: true }) label = '';
  @Input({ required: true }) value: string | number = '';
  @Input() icon = '';
  @Input() iconClasses = 'bg-blue-50 text-blue-600';
  @Input() note = '';
  @Input() trend = '';
  @Input() unit = '';
}
