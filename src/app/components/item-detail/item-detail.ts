import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProcessRecord } from '../../services/process.service';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  templateUrl: './item-detail.html',
  
  styleUrl: './item-detail.css',
  imports: [RouterLink],
})
export class ItemDetailComponent {
  @Input() item: ProcessRecord | null = null;

  initials(name: string): string {
    return name.split(' ').map((part) => part[0]).slice(0, 2).join('');
  }
}
