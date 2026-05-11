import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-financial',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  styles: [`
    .dashboard-container { padding: 30px; background-color: #f5f6fa; min-height: 100vh; font-family: 'Segoe UI', sans-serif; }
    .header-title { font-size: 1.5em; font-weight: bold; color: #333; margin-bottom: 20px; }
    .lock-screen { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 60vh; }
    .lock-card { background: #fff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; width: 350px; }
    .lock-input { width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px; text-align: center; letter-spacing: 5px;}
    .btn-unlock { background-color: #2d3436; color: #fff; border: none; padding: 12px; width: 100%; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .btn-unlock:hover { background-color: #72b146; }
    .financial-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
    .fin-card { background: #fff; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 5px solid #72b146; }
    .fin-card.alert { border-left-color: #d63031; }
    .fin-title { color: #888; font-size: 0.9em; text-transform: uppercase; margin-bottom: 10px; }
    .fin-value { font-size: 2em; font-weight: bold; color: #2d3436; }
    .dashboard-bottom { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
    .panel-section { background: #fff; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
    .section-title { font-size: 1.2em; font-weight: bold; color: #333; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px; display: flex; justify-content: space-between; align-items: center; }
    .progress-stacked { display: flex; height: 25px; border-radius: 12px; overflow: hidden; margin-bottom: 20px; }
    .bar-anual { background-color: #2d3436; }
    .bar-semestral { background-color: #72b146; }
    .bar-mensal { background-color: #ffeaa7; }
    .legend-item { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9em; }
    .legend-color { width: 12px; height: 12px; border-radius: 3px; display: inline-block; margin-right: 8px; }

    /* Estilos do Modal e Botão de Adicionar */
    .btn-add { background-color: #ef4444; color: white; border: none; padding: 6px 15px; border-radius: 4px; cursor: pointer; font-size: 0.75em; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; transition: 0.2s; }
    .btn-add:hover { background-color: #dc2626; }
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(2px); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .modal-card { background: white; padding: 30px; border-radius: 8px; width: 380px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
    .form-input { width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #e2e8f0; border-radius: 6px; box-sizing: border-box; font-family: inherit; }
    .form-input:focus { outline: none; border-color: #ef4444; }
  `],
  template: `
    <div class="dashboard-container">
      <div *ngIf="!isUnlocked" class="lock-screen">
        <div class="lock-card">
          <h3 style="margin-bottom: 20px;">Acesso Restrito</h3>
          <input type="password" class="lock-input" placeholder="••••••••" [(ngModel)]="pinInput" (keyup.enter)="unlock()">
          <div style="color: #d63031; margin-bottom: 15px;">{{ errorMessage }}</div>
          <button class="btn-unlock" (click)="unlock()">Desbloquear Cofre</button>
        </div>
      </div>

      <div *ngIf="isUnlocked">
        <div style="overflow: hidden; margin-bottom: 20px;">
          <h2 class="header-title" style="float: left;">Gestão Financeira e Faturamento</h2>
          <button (click)="lock()" style="float: right; border: 1px solid #d63031; color: #d63031; background: transparent; padding: 8px 15px; border-radius: 4px; cursor: pointer; font-weight: bold;">Bloquear Tela</button>
        </div>

        <div class="financial-grid">
          <div class="fin-card"><div class="fin-title">Faturamento (Mês)</div><div class="fin-value">R$ 142.500,00</div></div>
          <div class="fin-card"><div class="fin-title">Receita Realizada</div><div class="fin-value">R$ 98.450,00</div></div>
          <div class="fin-card alert"><div class="fin-title">Inadimplência</div><div class="fin-value" style="color: #d63031;">R$ 4.890,00</div></div>
        </div>

        <div class="dashboard-bottom">
          <div class="panel-section">
            <div class="section-title" style="color: #ef4444; border-bottom-color: #fee2e2;">
              Saídas de Caixa
              <button class="btn-add" (click)="abrirModal()">+ Nova Despesa</button>
            </div>
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
              <thead>
                <tr style="color: #94a3b8; font-size: 0.8em;">
                  <th>CATEGORIA</th><th>VENCIMENTO</th><th>VALOR</th><th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let despesa of despesas" style="border-bottom: 1px solid #f1f5f9;">
                  <td style="font-weight: bold; color: #ef4444;">R$ {{ despesa.valor }}</td>
                  <td>
                    <span [style.color]="despesa.status === 'Pago' ? '#72b146' : '#f59e0b'" style="font-weight: bold; cursor: pointer;" (click)="mudarStatus(despesa)">
                      {{ despesa.status }} 🔁
                    </span>
                  </td>
                  <td>
                    <button (click)="editarValor(despesa)" style="background: transparent; border: none; cursor: pointer; font-size: 1.2em;" title="Editar Valor">✏️</button>
                    <button (click)="excluirDespesa(despesa.id)" style="background: transparent; border: none; cursor: pointer; font-size: 1.2em;" title="Excluir">🗑️</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="panel-section">
            <div class="section-title">Distribuição de Planos</div>
            <div class="progress-stacked">
              <div class="bar-anual" [style.width.%]="planDistribution.anual"></div>
              <div class="bar-semestral" [style.width.%]="planDistribution.semestral"></div>
              <div class="bar-mensal" [style.width.%]="planDistribution.mensal"></div>
            </div>
            <div class="legend-item"><div><span class="legend-color bar-anual"></span> Anual</div><strong>{{ planDistribution.anual }}%</strong></div>
            <div class="legend-item"><div><span class="legend-color bar-semestral"></span> Semestral</div><strong>{{ planDistribution.semestral }}%</strong></div>
            <div class="legend-item"><div><span class="legend-color bar-mensal"></span> Mensal</div><strong>{{ planDistribution.mensal }}%</strong></div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-overlay" *ngIf="modalAberto">
      <div class="modal-card">
        <h3 style="margin-top: 0; color: #1e293b; margin-bottom: 20px;">Registrar Nova Saída</h3>
        
        <input class="form-input" placeholder="Categoria (ex: Internet, Manutenção)" [(ngModel)]="novaDespesa.categoria">
        <input class="form-input" placeholder="Vencimento (ex: 20/05/2026)" [(ngModel)]="novaDespesa.vencimento">
        <input class="form-input" placeholder="Valor (ex: 150,00)" [(ngModel)]="novaDespesa.valor">
        
        <select class="form-input" [(ngModel)]="novaDespesa.status">
          <option value="Pendente">Pendente</option>
          <option value="Pago">Pago</option>
          
        </select>
        
        <div style="display: flex; gap: 10px; margin-top: 10px;">
          <button (click)="modalAberto = false" style="flex: 1; background: #f1f5f9; color: #475569; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: bold;">Cancelar</button>
          <button (click)="salvarDespesa()" style="flex: 1; background: #ef4444; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: bold;">Salvar</button>
        </div>
      </div>
    </div>
  `
})
export class FinancialComponent {
  isUnlocked = false;
  pinInput = '';
  errorMessage = '';
  

  // Lógica do Modal de Despesas
  modalAberto = false;
  novaDespesa = { categoria: '', vencimento: '', valor: '', status: 'Pendente' };

  mudarStatus(despesa: any) {
    const novoStatus = despesa.status === 'Pago' ? 'Pendente' : 'Pago';
    this.http.put(`http://localhost:5000/api/financeiro/despesas/${despesa.id}`, { status: novoStatus })
      .subscribe(() => despesa.status = novoStatus);
  }

  editarValor(despesa: any) {
    const novoValor = prompt('Digite o novo valor (ex: 1.500,00):', despesa.valor);
    if (novoValor && novoValor !== despesa.valor) {
      this.http.put(`http://localhost:5000/api/financeiro/despesas/${despesa.id}`, { valor: novoValor })
        .subscribe(() => despesa.valor = novoValor);
    }
  }

  excluirDespesa(id: number) {
    if (confirm('Tem certeza que deseja apagar esta despesa permanentemente?')) {
      this.http.delete(`http://localhost:5000/api/financeiro/despesas/${id}`)
        .subscribe(() => this.carregarDadosFinanceiros()); // Recarrega a tabela atualizada
    }
  }

  planDistribution = { anual: 55, semestral: 30, mensal: 15 };
  despesas: any[] = [
    { categoria: 'Manutenção Equipamentos', vencimento: '15/05/2026', valor: '1.200,00', status: 'Pendente' },
    { categoria: 'Energia (Uplay)', vencimento: '10/05/2026', valor: '2.450,00', status: 'Pago' },
    { categoria: 'Aluguel Fazendinha', vencimento: '05/05/2026', valor: '8.000,00', status: 'Pago' }
  ];

  constructor(private http: HttpClient) {}

  unlock() {
    this.http.post<any>('http://localhost:5000/api/auth/financeiro', { pin: this.pinInput })
      .subscribe({
        next: (response) => {
          this.isUnlocked = true;
          this.errorMessage = '';
          this.pinInput = ''; 
          this.carregarDadosFinanceiros(); // CHAMA O BANCO DE DADOS ASSIM QUE DESBLOQUEAR
        },
        error: (err) => {
          this.errorMessage = 'Acesso negado pelo servidor. PIN incorreto.';
          this.pinInput = '';
        }
      });
  }

  carregarDadosFinanceiros() {
    this.http.get<any>('http://localhost:5000/api/financeiro/dados')
      .subscribe({
        next: (dados) => {
          this.despesas = dados.despesas;
          this.planDistribution = dados.planDistribution;
        },
        error: (erro) => console.error('Erro ao buscar dados financeiros:', erro)
      });
  }

  lock() {
    this.isUnlocked = false;
  }

  // Funções do Modal
  abrirModal() {
    this.novaDespesa = { categoria: '', vencimento: '', valor: '', status: 'Pendente' };
    this.modalAberto = true;
  }

  salvarDespesa() {
    if (this.novaDespesa.categoria && this.novaDespesa.valor) {
      this.despesas.push({ ...this.novaDespesa });
      this.modalAberto = false;
    } else {
      alert("Por favor, preencha a categoria e o valor.");
    }
  }
}