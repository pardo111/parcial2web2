import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProcessRecord, ProcessService } from '../../services/process.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './process-detail.html',
  
  styleUrl: './process-detail.css',
})
export class ProcessDetailComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  processName = '';
  record: ProcessRecord | undefined;

  constructor(private readonly route: ActivatedRoute, private readonly service: ProcessService) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.processName = params.get('proceso') ?? '';
      this.record = this.service.getById(this.processName);
    });
  }
}
