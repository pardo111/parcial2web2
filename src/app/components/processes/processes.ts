import { ChangeDetectorRef, Component, DestroyRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProcessRecord, ProcessService } from '../../services/process.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './processes.html',
  
  styleUrl: './processes.css',
})
export class ProcessesComponent {
  readonly pageSize = 10;
  currentPage = 1;
  records: ProcessRecord[] = [];

  constructor(
    readonly service: ProcessService,
    destroyRef: DestroyRef,
    private readonly changeDetector: ChangeDetectorRef,
  ) {
    this.service.records$.pipe(takeUntilDestroyed(destroyRef)).subscribe((records) => {
      this.records = records;
      this.currentPage = Math.min(this.currentPage, Math.max(1, this.totalPages));
      this.changeDetector.markForCheck();
    });
  }

  get totalPages(): number {
    return Math.ceil(this.records.length / this.pageSize);
  }

  get pageRecords() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.records.slice(start, start + this.pageSize);
  }

  get firstVisibleRecord(): number {
    return this.records.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get lastVisibleRecord(): number {
    return Math.min(this.currentPage * this.pageSize, this.records.length);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  closeProcess(id: string): void {
    this.service.close(id);
  }
}
