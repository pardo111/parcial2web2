import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProcessRecord } from '../../services/process.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  templateUrl: './item-list.html',
  
  styleUrl: './item-list.css',
})
export class ItemListComponent {
  @Input({ required: true }) items: ProcessRecord[] = [];
  @Input() selectedId: string | undefined;
  @Output() readonly itemSelected = new EventEmitter<ProcessRecord>();
}
