import { Routes } from '@angular/router';
import { DashboardComponent } from './layouts/dashboard/dashboard';
import { NotFoundComponent } from './components/not-found/not-found';
import { ProcessDetailComponent } from './components/process-detail/process-detail';
import { ProcessesComponent } from './components/processes/processes';
import { ReportsComponent } from './components/reports/reports';

export const routes: Routes = [
  { path: '', component: DashboardComponent, title: 'Inicio' },
  { path: 'procesos', component: ProcessesComponent, title: 'Procesos ' },
  { path: 'reportes', component: ReportsComponent, title: 'Reportes ' },
  { path: 'proceso/:proceso', component: ProcessDetailComponent, title: 'Detalle de proceso ' },
  { path: '**', component: NotFoundComponent, title: '404 ' },
];
