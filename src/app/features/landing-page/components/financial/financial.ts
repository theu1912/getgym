import { Component, LOCALE_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

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
          <button class="btn-lock" style="display: flex; align-items: center; gap: 8px;" (click)="lock()">
            Bloquear Painel
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </button>
        </div>

        <div class="financial-grid">
          <div class="fin-card">
            <div class="fin-title">Faturamento Estimado (Mês)</div>
            <div class="fin-value">{{ resumo.faturamento | currency:'BRL':'symbol':'1.2-2':'pt-BR' }}</div>
          </div>
          <div class="fin-card">
            <div class="fin-title">Receita Realizada (Livre)</div>
            <div class="fin-value" [style.color]="resumo.receita < 0 ? '#ef4444' : '#2d3436'">
              {{ resumo.receita | currency:'BRL':'symbol':'1.2-2':'pt-BR' }}
            </div>
          </div>
          <div class="fin-card alert">
            <div class="fin-title">Inadimplência (Histórico)</div>
            <div class="fin-value" style="color: #d63031;">{{ resumo.inadimplencia | currency:'BRL':'symbol':'1.2-2':'pt-BR' }}</div>
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
                <tr *ngFor="let despesa of despesas" style="border-bottom: 1px solid #f1f5f9; transition: background 0.2s;">
                  <td style="padding: 15px 20px; font-weight: 600; color: #334155;">{{ despesa.categoria }}</td>
                  <td style="padding: 15px 20px; color: #f59e0b; font-weight: 500;">{{ despesa.vencimento }}</td>
                  <td style="padding: 15px 20px; color: #ef4444; font-weight: bold;">
                    {{ despesa.valor | currency:'BRL':'symbol':'1.2-2':'pt-BR' }}
                  </td>
                  <td style="padding: 15px 20px;">
                    <span (click)="mudarStatus(despesa)" style="cursor: pointer; padding: 6px 12px; border-radius: 20px; font-weight: bold; font-size: 0.75em; text-transform: uppercase;"
                          [ngStyle]="{'background': despesa.status === 'Pago' ? '#d1fae5' : '#fee2e2', 'color': despesa.status === 'Pago' ? '#10b981' : '#ef4444'}">
                      {{ despesa.status }} 🔁
                    </span>
                  </td>
                  <td style="padding: 15px 20px; display: flex; gap: 15px; align-items: center;">
                    <svg (click)="editarValor(despesa)" style="cursor: pointer; opacity: 0.7; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    <svg (click)="excluirDespesa(despesa.id)" style="cursor: pointer; opacity: 0.7; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                  </td>
                </tr>
                <tr *ngIf="despesas.length === 0">
                  <td colspan="5" style="text-align: center; padding: 30px; color: #94a3b8;">Nenhuma despesa registada.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
            <h3 style="color: #1e293b; margin-top: 0; margin-bottom: 20px;">Distribuição de Planos</h3>
            <div style="display: flex; height: 25px; border-radius: 12px; overflow: hidden; margin-bottom: 20px;">
              <div [style.width.%]="planDistribution.anual" style="background-color: #1e293b;"></div>
              <div [style.width.%]="planDistribution.semestral" style="background-color: #10b981;"></div>
              <div [style.width.%]="planDistribution.mensal" style="background-color: #fde047;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; color: #475569; font-size: 0.9em;">
              <div><span style="display: inline-block; width: 12px; height: 12px; border-radius: 3px; background-color: #1e293b; margin-right: 8px;"></span> Anual</div>
              <strong>{{ planDistribution.anual }}%</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; color: #475569; font-size: 0.9em;">
              <div><span style="display: inline-block; width: 12px; height: 12px; border-radius: 3px; background-color: #10b981; margin-right: 8px;"></span> Semestral</div>
              <strong>{{ planDistribution.semestral }}%</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; color: #475569; font-size: 0.9em;">
              <div><span style="display: inline-block; width: 12px; height: 12px; border-radius: 3px; background-color: #fde047; margin-right: 8px;"></span> Mensal</div>
              <strong>{{ planDistribution.mensal }}%</strong>
            </div>
          </div>

        </div>
      </div> 

      <div *ngIf="modalAberto" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.6); display: flex; justify-content: center; align-items: center; z-index: 1000;">
        <div style="background: white; padding: 30px; border-radius: 8px; width: 380px;">
          <h3 style="margin-top: 0; color: #1e293b; margin-bottom: 20px;">Registar Nova Saída</h3>
          <input style="width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #e2e8f0; border-radius: 6px;" placeholder="Categoria (ex: Luz, Internet)" [(ngModel)]="novaDespesa.categoria">
          <input style="width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #e2e8f0; border-radius: 6px;" type="date" [(ngModel)]="novaDespesa.vencimento">
          <input style="width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #e2e8f0; border-radius: 6px;" placeholder="Valor (ex: 150.00)" type="number" [(ngModel)]="novaDespesa.valor">
          <select style="width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #e2e8f0; border-radius: 6px;" [(ngModel)]="novaDespesa.status">
            <option value="Pendente">Pendente</option>
            <option value="Pago">Pago</option>
          </select>
          <div style="display: flex; gap: 10px;">
            <button (click)="modalAberto = false" style="flex: 1; background: #f1f5f9; padding: 12px; border-radius: 6px; border: none; cursor: pointer; font-weight: bold;">Cancelar</button>
            <button (click)="salvarDespesa()" style="flex: 1; background: #ef4444; color: white; padding: 12px; border-radius: 6px; border: none; cursor: pointer; font-weight: bold;">Guardar</button>
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

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  unlock() {
    this.http.post<any>(`${environment.apiUrl}/auth/financeiro`, { pin: this.pinInput })
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          
          this.isUnlocked = true;
          this.errorMessage = '';
          this.pinInput = ''; 
          this.carregarDadosFinanceiros();
        },
        error: (err) => {
          this.errorMessage = 'Acesso negado pelo servidor. PIN incorreto.';
          this.pinInput = '';
        }
      });
  }

  carregarDadosFinanceiros() {
    this.http.get<any>(`${environment.apiUrl}/financeiro/dados?unidade=Fazendinha`)
      .subscribe({
        next: (dados) => {
          this.despesas = dados.despesas;
          this.planDistribution = dados.planDistribution;
          this.resumo = dados.resumo;
          this.cdr.detectChanges(); 
        },
        error: (erro) => console.error('Erro ao procurar dados financeiros:', erro)
      });
  }

  lock() {
    this.isUnlocked = false;
  }

  abrirModal() {
    this.novaDespesa = { categoria: '', vencimento: '', valor: null, status: 'Pendente', unidade: 'Fazendinha' };
    this.modalAberto = true;
  }

  salvarDespesa() {
    if (this.novaDespesa.categoria && this.novaDespesa.valor && this.novaDespesa.vencimento) {
      this.http.post(`${environment.apiUrl}/financeiro/despesas`, this.novaDespesa)
        .subscribe({
          next: () => {
            this.modalAberto = false;
            this.carregarDadosFinanceiros();
          },
          error: (err) => alert('Erro ao guardar despesa.')
        });
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  }

  mudarStatus(despesa: any) {
    const novoStatus = despesa.status === 'Pago' ? 'Pendente' : 'Pago';
    this.http.put(`${environment.apiUrl}/financeiro/despesas/${despesa.id}`, { status: novoStatus })
      .subscribe(() => this.carregarDadosFinanceiros());
  }

  editarValor(despesa: any) {
    const novoValor = prompt('Digite o novo valor para ' + despesa.categoria, despesa.valor);
    if (novoValor !== null && novoValor.trim() !== '') {
      const valorFormatado = parseFloat(novoValor.replace(',', '.'));
      this.http.put(`${environment.apiUrl}/financeiro/despesas/${despesa.id}`, { valor: valorFormatado })
        .subscribe({
          next: () => this.carregarDadosFinanceiros(),
          error: (err) => alert('Erro ao atualizar no servidor: ' + err.message)
        });
    }
  }

  excluirDespesa(id: number) {
    if (confirm('Tem a certeza que deseja excluir esta despesa permanentemente?')) {
      this.http.delete(`${environment.apiUrl}/financeiro/despesas/${id}`)
        .subscribe({
          next: () => this.carregarDadosFinanceiros(),
          error: (err) => alert('Erro ao excluir no servidor: ' + err.message)
        });
    }
  }
}