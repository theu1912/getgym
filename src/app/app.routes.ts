import { Component } from '@angular/core'; // 1. Importamos o construtor de componente
import { Routes } from '@angular/router';
import { FinancialComponent } from './features/landing-page/components/financial/financial';
import { authGuard } from './auth-guard';
import { LoginComponent } from './features/login/login.component';
import { LandingPageComponent } from './features/landing-page/landing-page';
import { CheckoutComponent } from './checkout.component';
import { StudentsTableComponent } from './admin/students-table/students-table';
import { StaffScheduleComponent } from './admin/staff.schedule/staff-schedule';
import { DashboardOverviewComponent } from './admin/dashboard-overview/dashboard-overview';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout';

// 2. Criamos uma tela temporária aqui dentro para o Angular não reclamar de arquivo faltando
@Component({
  standalone: true,
  template: `
    <div style="padding: 30px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <h2 style="font-size: 28px; margin-bottom: 5px; color: #2d3436;">🗓️ Grade de Aulas Coletivas</h2>
      <p style="color: #636e72; font-size: 16px; margin-bottom: 30px;">Confira a programação e a lotação das turmas de hoje (Unidade Fazendinha):</p>

      <div style="display: flex; gap: 20px; flex-wrap: wrap;">

        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 280px; border-left: 5px solid #ff7675;">
          <h3 style="margin: 0 0 15px 0; color: #2d3436; font-size: 22px;">🚴 Spinning</h3>
          <p style="margin: 8px 0; color: #636e72; font-size: 15px;"><strong>⏰ Horário:</strong> 08:00 - 09:00</p>
          <p style="margin: 8px 0; color: #636e72; font-size: 15px;"><strong>👨‍🏫 Prof:</strong> Carlos Eduardo</p>
          <p style="margin: 8px 0; color: #636e72; font-size: 15px;"><strong>📍 Local:</strong> Sala 01</p>
          <div style="margin-top: 15px; padding: 6px 12px; background: #ffeaa7; color: #d63031; border-radius: 20px; font-size: 13px; font-weight: bold; display: inline-block;">
            🔥 18/20 Vagas
          </div>
        </div>

        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 280px; border-left: 5px solid #55efc4;">
          <h3 style="margin: 0 0 15px 0; color: #2d3436; font-size: 22px;">🧘‍♀️ Pilates</h3>
          <p style="margin: 8px 0; color: #636e72; font-size: 15px;"><strong>⏰ Horário:</strong> 10:00 - 11:00</p>
          <p style="margin: 8px 0; color: #636e72; font-size: 15px;"><strong>👩‍🏫 Prof:</strong> Ana Beatriz</p>
          <p style="margin: 8px 0; color: #636e72; font-size: 15px;"><strong>📍 Local:</strong> Sala 02</p>
          <div style="margin-top: 15px; padding: 6px 12px; background: #dff9fb; color: #00b894; border-radius: 20px; font-size: 13px; font-weight: bold; display: inline-block;">
            ✅ Vagas Livres
          </div>
        </div>

        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 280px; border-left: 5px solid #74b9ff;">
          <h3 style="margin: 0 0 15px 0; color: #2d3436; font-size: 22px;">🥊 Muay Thai</h3>
          <p style="margin: 8px 0; color: #636e72; font-size: 15px;"><strong>⏰ Horário:</strong> 18:30 - 20:00</p>
          <p style="margin: 8px 0; color: #636e72; font-size: 15px;"><strong>👨‍🏫 Prof:</strong> Pedro Rocha</p>
          <p style="margin: 8px 0; color: #636e72; font-size: 15px;"><strong>📍 Local:</strong> Tatame Principal</p>
          <div style="margin-top: 15px; padding: 6px 12px; background: #fab1a0; color: #d63031; border-radius: 20px; font-size: 13px; font-weight: bold; display: inline-block;">
            🛑 Lotado
          </div>
        </div>

        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.03); width: 280px; border-left: 5px solid #fdcb6e;">
          <h3 style="margin: 0 0 15px 0; color: #2d3436; font-size: 22px;">💃 Fit Dance</h3>
          <p style="margin: 8px 0; color: #636e72; font-size: 15px;"><strong>⏰ Horário:</strong> 20:00 - 21:00</p>
          <p style="margin: 8px 0; color: #636e72; font-size: 15px;"><strong>👩‍🏫 Prof:</strong> Julia Santos</p>
          <p style="margin: 8px 0; color: #636e72; font-size: 15px;"><strong>📍 Local:</strong> Sala Principal</p>
          <div style="margin-top: 15px; padding: 6px 12px; background: #dff9fb; color: #00b894; border-radius: 20px; font-size: 13px; font-weight: bold; display: inline-block;">
            ✅ Vagas Livres
          </div>
        </div>

      </div>
    </div>
  `
})
export class AulasPlaceholderComponent {}

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  
  { 
    path: 'admin', 
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardOverviewComponent },
      { path: 'alunos', component: StudentsTableComponent },
      { path: 'equipe', component: StaffScheduleComponent },
      
      // 3. Ativamos a rota apontando para o nosso componente temporário!
      { path: 'aulas', component: AulasPlaceholderComponent },
      
      { path: 'financeiro', component: FinancialComponent, canActivate: [authGuard] },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }, 
  
  { path: '**', redirectTo: '' }
];