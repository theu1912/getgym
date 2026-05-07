import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-financial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    .dashboard-container { padding: 30px; background-color: #f5f6fa; min-height: 100vh; font-family: 'Segoe UI', sans-serif; }
    .header-title { font-size: 1.5em; font-weight: bold; color: #333; margin-bottom: 20px; }
    
    /* Estilos do Cofre (Lock Screen) */
    .lock-screen { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 60vh; }
    .lock-card { background: #fff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; width: 350px; }
    .lock-icon { width: 50px; height: 50px; background-color: #ffeaa7; color: #d63031; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
    .lock-input { width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; font-size: 1em; text-align: center; letter-spacing: 5px;}
    .btn-unlock { background-color: #2d3436; color: #fff; border: none; padding: 12px; width: 100%; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s; }
    .btn-unlock:hover { background-color: #72b146; }
    .error-msg { color: #d63031; font-size: 0.9em; margin-bottom: 15px; min-height: 20px; }

    /* Estilos dos Dados Financeiros */
    .financial-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
    .fin-card { background: #fff; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 5px solid #72b146; }
    .fin-card.alert { border-left-color: #d63031; }
    .fin-title { color: #888; font-size: 0.9em; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
    .fin-value { font-size: 2em; font-weight: bold; color: #2d3436; }
    .btn-lock { background: transparent; border: 1px solid #d63031; color: #d63031; padding: 8px 15px; border-radius: 4px; cursor: pointer; float: right; font-weight: bold; }
    .btn-lock:hover { background: #d63031; color: #fff; }
  `],
  template: `
    <div class="dashboard-container">
      
      <div *ngIf="!isUnlocked" class="lock-screen">
        <div class="lock-card">
          <div class="lock-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h3 style="margin-bottom: 10px; color: #2d3436;">Acesso Restrito</h3>
          <p style="color: #888; font-size: 0.9em; margin-bottom: 20px;">Área financeira exclusiva para gerência.</p>
          
          <input type="password" class="lock-input" placeholder="••••••••" [(ngModel)]="pinInput" (keyup.enter)="unlock()">
          <div class="error-msg">{{ errorMessage }}</div>
          
          <button class="btn-unlock" (click)="unlock()">Desbloquear Cofre</button>
        </div>
      </div>

      <div *ngIf="isUnlocked">
        <div style="overflow: hidden; margin-bottom: 20px;">
          <h2 class="header-title" style="float: left;">Gestão Financeira e Faturamento</h2>
          <button class="btn-lock" (click)="lock()">Bloquear Tela</button>
        </div>

        <div class="financial-grid">
          <div class="fin-card">
            <div class="fin-title">Faturamento Previsto (Mês)</div>
            <div class="fin-value">R$ 142.500,00</div>
            <p style="color: #72b146; font-size: 0.85em; margin-top: 10px; font-weight: bold;">+ 5.2% vs Mês Anterior</p>
          </div>
          
          <div class="fin-card">
            <div class="fin-title">Receita Realizada</div>
            <div class="fin-value">R$ 98.450,00</div>
          </div>

          <div class="fin-card alert">
            <div class="fin-title">Inadimplência Aberta</div>
            <div class="fin-value" style="color: #d63031;">R$ 4.890,00</div>
            <p style="color: #d63031; font-size: 0.85em; margin-top: 10px;">34 Alunos Atrasados</p>
          </div>
        </div>
        
        <div style="background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            <h3 style="color: #333; margin-bottom: 15px; font-size: 1.1em;">Extrato Recente (Integração Gateway)</h3>
            <p style="color: #888;">Nenhuma transação liquidada nas últimas 2 horas.</p>
        </div>
      </div>

    </div>
  `
})
export class FinancialComponent {
  isUnlocked = false;
  pinInput = '';
  errorMessage = '';

  unlock() {
    // Validação estática para o Front-end. No futuro, baterá na API Python.
    if (this.pinInput === 'admin123') {
      this.isUnlocked = true;
      this.errorMessage = '';
      this.pinInput = ''; // Limpa o input por segurança
    } else {
      this.errorMessage = 'Credenciais inválidas. Acesso negado.';
      this.pinInput = '';
    }
  }

  lock() {
    this.isUnlocked = false;
  }
}