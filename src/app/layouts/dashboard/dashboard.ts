import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ItemDetailComponent } from '../../components/item-detail/item-detail';
import { ItemListComponent } from '../../components/item-list/item-list';
import { SummaryCardComponent } from '../../components/summary-card/summary-card';
import { ProcessRecord, ProcessService } from '../../services/process.service';

@Component({
  standalone: true,
  imports: [AsyncPipe, RouterLink, ItemListComponent, ItemDetailComponent, SummaryCardComponent],
  templateUrl: './dashboard.html',
  
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  readonly pageSize = 10;
  currentPage = 1;
  selected: ProcessRecord | null = null;
  constructor(readonly service: ProcessService) {}

  selectItem(item: ProcessRecord): void { this.selected = item; }

  get totalPages(): number {
    return Math.ceil(this.service.total / this.pageSize);
  }

  recordsForPage(records: ProcessRecord[]): ProcessRecord[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return records.slice(start, start + this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  addProcess(): void {
    const id = `PR-${String(this.service.total + 1).padStart(3, '0')}`;
    const record: ProcessRecord = { id, name: 'Nuevo proceso', category: 'Operaciones', owner: 'Andrea Morales', status: 'Pendiente', progress: 0, updated: 'Ahora', description: 'Proceso nuevo listo para configurar y asignar al equipo.' };
    this.service.add(record);
    this.selected = record;
    this.currentPage = 1;
  }
}
