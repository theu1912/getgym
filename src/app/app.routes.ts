import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout';
import { DashboardOverviewComponent } from './admin/dashboard-overview/dashboard-overview';
import { StudentsTableComponent } from './admin/students-table/students-table';
import { FinancialComponent } from './features/landing-page/components/financial/financial';
import { ScheduleComponent } from './features/landing-page/components/schedule/schedule';
import { CheckoutComponent } from './checkout.component';
import { StaffScheduleComponent } from './admin/staff.schedule/staff-schedule';
import { ConfirmationComponent } from './features/landing-page/components/confirmation.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'confirmacao', component: ConfirmationComponent },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],   // ← protege todo o painel admin
    children: [
      { path: 'dashboard',     component: DashboardOverviewComponent },
      { path: 'alunos',        component: StudentsTableComponent },
      { path: 'financeiro',    component: FinancialComponent },
      { path: 'aulas',         component: ScheduleComponent },
      { path: 'profissionais', component: StaffScheduleComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },

  { path: '**', redirectTo: '' }
];
