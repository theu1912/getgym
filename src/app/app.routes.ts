import { Routes } from '@angular/router';
import { FinancialComponent } from './features/landing-page/components/financial/financial';
import { authGuard } from './auth-guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  // A rota padrão agora é o Login (Aberto ao público)
  { path: 'login', component: LoginComponent },
  
  // O Financeiro continua blindado pelo segurança
  { 
    path: 'financeiro', 
    component: FinancialComponent, 
    canActivate: [authGuard] 
  },
  
  // Se o usuário digitar o link vazio, joga pro login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];