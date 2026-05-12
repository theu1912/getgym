import { Component, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

registerLocaleData(localePt);

@Component({
  selector: 'app-financial',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  styles: [`
    .dashboard-container { padding: 30px; background-color: #f5f6fa; min-height: 100vh; font-family: 'Segoe UI', sans-serif; }
    .header-title { font-size: 1.5em; font-weight: bold; color: #333; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;}
    .lock-screen { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 60vh; }
    .lock-card { background: #fff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; width: 350px; }
    .lock-input { width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px; text-align: center; letter-spacing: 5px; font-size: 1.2em;}
    .btn-unlock { background-color: #2d3436; color: #fff; border: none; padding: 12px; width: 100%; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .btn-lock { background-color: #ef4444; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; font-size: 0.8em; }

    .financial-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
    .fin-card { background: #fff; padding: 25px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border-left: 4px solid #10b981; }
    .fin-card.alert { border-left-color: #ef4444; }
    .fin-title { font-size: 0.85em; font-weight: 600; color: #64748b; text-transform: uppercase; margin-bottom: 10px; }
    .fin-value { font-size: 2em; font-weight: bold; color: #0f172a; }
  `],
  template: `
    <div class="dashboard-container">
      
      <div *ngIf="!isUnlocked" class="lock-screen">
        <div class="lock-card">
          <h2 style="margin-bottom: 20px; color: #333;">Acesso Restrito</h2>
          <input type="password" class="lock-input" [(ngModel)]="pinInput" placeholder="PIN" maxlength="6" (keyup.enter)="unlock()">
          <div *ngIf="errorMessage" style="color: #ef4444; margin-bottom: 15px; font-size: 0.9em;">{{ errorMessage }}</div>
          <button class="btn-unlock" (click)="unlock()">Desbloquear Cofre</button>
        </div>
      </div>

      <div *ngIf="isUnlocked">
        <div class="header-title">
          Gestão Financeira
          <button class="btn-lock" (click)="lock()">Bloquear Painel 🔒</button>
        </div>

        <div class="financial-grid">
          <div class="fin-card">
            <div class="fin-title">Faturamento Estimado (Mês)</div>
            <div class="fin-value">{{ resumo.faturamento | currency:'BRL':'symbol':'1.2-2' }}</div>
          </div>
          <div class="fin-card">
            <div class="fin-title">Receita Realizada (Livre)</div>
            <div class="fin-value" [style.color]="resumo.receita < 0 ? '#ef4444' : '#2d3436'">
              {{ resumo.receita | currency:'BRL':'symbol':'1.2-2' }}
            </div>
          </div>
          <div class="fin-card alert">
            <div class="fin-title">Inadimplência (Histórico)</div>
            <div class="fin-value" style="color: #d63031;">{{ resumo.inadimplencia | currency:'BRL':'symbol':'1.2-2' }}</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px;">
          
          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <h3 style="color: #1e293b; margin: 0;">Controle de Despesas</h3>
              <button (click)="abrirModal()" style="background-color: #ef4444; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 0.85em;">+ NOVA DESPESA</button>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
              <thead>
                <tr style="border-bottom: 1px solid #f1f5f9; background: #f8fafc;">
                  <th style="padding: 15px 20px; color: #64748b; font-size: 0.85em; font-weight: 600;">CATEGORIA</th>
                  <th style="padding: 15px 20px; color: #64748b; font-size: 0.85em; font-weight: 600;">VENCIMENTO</th>
                  <th style="padding: 15px 20px; color: #64748b; font-size: 0.85em; font-weight: 600;">VALOR</th>
                  <th style="padding: 15px 20px; color: #64748b; font-size: 0.85em; font-weight: 600;">STATUS</th>
                  <th style="padding: 15px 20px; color: #64748b; font-size: 0.85em; font-weight: 600;">AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let despesa of despesas" style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 15px 20px; font-weight: 600;">{{ despesa.categoria }}</td>
                  <td style="padding: 15px 20px;">{{ despesa.vencimento }}</td>
                  <td style="padding: 15px 20px; color: #ef4444; font-weight: bold;">{{ despesa.valor | currency:'BRL':'symbol':'1.2-2' }}</td>
                  <td style="padding: 15px 20px;">
                    <span (click)="mudarStatus(despesa)" style="cursor: pointer; padding: 6px 12px; border-radius: 20px; font-weight: bold; font-size: 0.75em;"
                          [ngStyle]="{'background': despesa.status === 'Pago' ? '#d1fae5' : '#fee2e2', 'color': despesa.status === 'Pago' ? '#10b981' : '#ef4444'}">
                      {{ despesa.status }} 🔁
                    </span>
                  </td>
                  <td style="padding: 15px 20px; display: flex; gap: 15px;">
                    <svg (click)="editarValor(despesa)" style="cursor: pointer;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    <svg (click)="excluirDespesa(despesa.id)" style="cursor: pointer;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
            <h3 style="color: #1e293b; margin-top: 0; margin-bottom: 20px;">Distribuição de Planos</h3>
            </div>
        </div>

        <div *ngIf="modalAberto" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.6); display: flex; justify-content: center; align-items: center; z-index: 1000;">
          <div style="background: white; padding: 30px; border-radius: 8px; width: 380px;">
            <h3 style="margin-top: 0; color: #1e293b; margin-bottom: 20px;">Registrar Nova Saída</h3>
            <input style="width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #e2e8f0; border-radius: 6px;" placeholder="Categoria" [(ngModel)]="novaDespesa.categoria">
            <input style="width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #e2e8f0; border-radius: 6px;" type="date" [(ngModel)]="novaDespesa.vencimento">
            <input style="width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #e2e8f0; border-radius: 6px;" placeholder="Valor" type="number" [(ngModel)]="novaDespesa.valor">
            <div style="display: flex; gap: 10px;">
              <button (click)="modalAberto = false" style="flex: 1; background: #f1f5f9; padding: 12px; border-radius: 6px; border: none; cursor: pointer;">Cancelar</button>
              <button (click)="salvarDespesa()" style="flex: 1; background: #ef4444; color: white; padding: 12px; border-radius: 6px; border: none; cursor: pointer;">Salvar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class FinancialComponent {
  isUnlocked = false;
  pinInput = '';
  errorMessage = '';

  despesas: any[] = [];
  planDistribution: any = { anual: 0, semestral: 0, mensal: 0 };
  resumo = { faturamento: 0, receita: 0, inadimplencia: 0 };

  modalAberto = false;
  novaDespesa: any = { categoria: '', vencimento: '', valor: null, status: 'Pendente', unidade: 'Fazendinha' };

  constructor(private http: HttpClient) {}

  unlock() {
    this.http.post<any>('http://localhost:5000/api/auth/financeiro', { pin: this.pinInput })
      .subscribe({
        next: () => {
          this.isUnlocked = true;
          this.errorMessage = '';
          this.pinInput = ''; 
          this.carregarDadosFinanceiros();
        },
        error: () => {
          this.errorMessage = 'PIN incorreto.';
          this.pinInput = '';
        }
      });
  }

  carregarDadosFinanceiros() {
    this.http.get<any>('http://localhost:5000/api/financeiro/dados?unidade=Fazendinha')
      .subscribe({
        next: (dados) => {
          this.despesas = dados.despesas;
          this.planDistribution = dados.planDistribution;
          this.resumo = dados.resumo;
        }
      });
  }

  lock() { this.isUnlocked = false; }

  abrirModal() {
    this.novaDespesa = { categoria: '', vencimento: '', valor: null, status: 'Pendente', unidade: 'Fazendinha' };
    this.modalAberto = true;
  }

  salvarDespesa() {
    if (this.novaDespesa.categoria && this.novaDespesa.valor && this.novaDespesa.vencimento) {
      this.http.post('http://localhost:5000/api/financeiro/despesas', this.novaDespesa)
        .subscribe(() => {
          this.modalAberto = false;
          this.carregarDadosFinanceiros();
        });
    }
  }

  mudarStatus(despesa: any) {
    const novoStatus = despesa.status === 'Pago' ? 'Pendente' : 'Pago';
    this.http.put(`http://localhost:5000/api/financeiro/despesas/${despesa.id}`, { status: novoStatus })
      .subscribe(() => this.carregarDadosFinanceiros());
  }

  editarValor(despesa: any) {
    const novoValor = prompt('Digite o novo valor para ' + despesa.categoria, despesa.valor);
    if (novoValor) {
      this.http.put(`http://localhost:5000/api/financeiro/despesas/${despesa.id}`, { valor: parseFloat(novoValor) })
        .subscribe(() => this.carregarDadosFinanceiros());
    }
  }

  excluirDespesa(id: number) {
    if (confirm('Deseja excluir esta despesa?')) {
      this.http.delete(`http://localhost:5000/api/financeiro/despesas/${id}`)
        .subscribe(() => this.carregarDadosFinanceiros());
    }
  }
}