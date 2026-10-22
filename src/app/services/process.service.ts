import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ProcessRecord {
  id: string;
  name: string;
  category: string;
  owner: string;
  status: 'En progreso' | 'Completado' | 'Pendiente';
  progress: number;
  updated: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ProcessService {
  private readonly recordsSubject = new BehaviorSubject<ProcessRecord[]>([
    { id: 'PR-001', name: 'Incorporación de clientes', category: 'Operaciones', owner: 'Sofía Ramírez', status: 'En progreso', progress: 68, updated: 'Hoy, 10:42', description: 'Proceso de registro, validación y activación para nuevos clientes.' },
    { id: 'PR-002', name: 'Aprobación de solicitudes', category: 'Finanzas', owner: 'Carlos Méndez', status: 'Completado', progress: 100, updated: 'Hoy, 09:18', description: 'Revisión de solicitudes y autorización de operaciones financieras.' },
    { id: 'PR-003', name: 'Gestión de proveedores', category: 'Administración', owner: 'Lucía Herrera', status: 'En progreso', progress: 42, updated: 'Ayer, 16:35', description: 'Alta, evaluación y seguimiento de proveedores estratégicos.' },
    { id: 'PR-004', name: 'Cierre mensual contable', category: 'Finanzas', owner: 'Diego Castro', status: 'Pendiente', progress: 0, updated: 'Ayer, 14:06', description: 'Conciliación de cuentas y preparación de informes de cierre.' },
    { id: 'PR-005', name: 'Atención de incidencias', category: 'Soporte', owner: 'Valeria Cruz', status: 'En progreso', progress: 81, updated: '12 oct, 11:20', description: 'Registro, clasificación y resolución de incidentes internos.' },
  ]);

  readonly records$ = this.recordsSubject.asObservable();

  get records(): ProcessRecord[] {
    return this.recordsSubject.value;
  }

  get total(): number {
    return this.records.length;
  }

  get completed(): number {
    return this.records.filter((record) => record.status === 'Completado').length;
  }

  get inProgress(): number {
    return this.records.filter((record) => record.status === 'En progreso').length;
  }

  getById(id: string): ProcessRecord | undefined {
    return this.records.find((record) => record.id === id || record.id.toLowerCase() === id.toLowerCase());
  }

  add(record: ProcessRecord): void {
    this.recordsSubject.next([record, ...this.records]);
  }

  update(id: string, changes: Partial<ProcessRecord>): void {
    this.recordsSubject.next(this.records.map((record) => record.id === id ? { ...record, ...changes } : record));
  }

  close(id: string): void {
    this.update(id, { status: 'Completado', progress: 100, updated: 'Ahora' });
  }
}
