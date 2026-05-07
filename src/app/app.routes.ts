import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout';
import { DashboardOverviewComponent } from './admin/dashboard-overview/dashboard-overview';
import { StudentsTableComponent } from './admin/students-table/students-table';
import { FinancialComponent } from './features/landing-page/components/financial/financial';
import { ScheduleComponent } from './features/landing-page/components/schedule/schedule';
import { CheckoutComponent } from './checkout.component'; // ROTA NOVA AQUI


export const routes: Routes = [
  // 1. Rota da Página Inicial (Landing Page) que estava faltando
  { path: '', component: LandingPageComponent },
  
  // 2. Rota de Checkout
  { path: 'checkout', component: CheckoutComponent },

  // 3. Rotas do Painel de Administração
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardOverviewComponent },
      { path: 'alunos', component: StudentsTableComponent },
      
      // Rotas novas AGORA DENTRO do children para herdar o menu!
      { path: 'financeiro', component: FinancialComponent },
      { path: 'aulas', component: ScheduleComponent },
      
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // 4. Rota Curinga
  { path: '**', redirectTo: '' }
];