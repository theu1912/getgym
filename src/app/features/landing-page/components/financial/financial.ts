import { Component, OnInit, LOCALE_ID, inject, signal, computed } from '@angular/core';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

registerLocaleData(localePt);

type Unidade = 'Fazendinha' | 'Piraquara' | 'Pinhais';

interface Despesa {
  id: number;
  categoria: string;
  vencimento: string;
  valor: number;
  status: 'Pago' | 'Pendente';
}

interface Resumo {
  faturamento: number;
  receita: number;
  inadimplencia: number;
}

interface Plano {
  nome: string;
  percent: number;
}

@Component({
  selector: 'app-financial',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CurrencyPipe],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  templateUrl: './financial.html',
  styleUrl: './financial.scss'
})
export class FinancialComponent implements OnInit {
  private readonly http = inject(HttpClient);

  readonly isUnlocked = signal(false);
  readonly pinInput = signal('');
  readonly errorMessage = signal('');
  readonly unidadeSelecionada = signal<Unidade>('Fazendinha');

  readonly despesas = signal<Despesa[]>([]);
  readonly resumo   = signal<Resumo>({ faturamento: 0, receita: 0, inadimplencia: 0 });
  readonly planos   = signal<Plano[]>([]);

  readonly modalAberto = signal(false);
  readonly novaDespesa = signal({ categoria: '', vencimento: '', valor: null as number | null, status: 'Pendente' });

  readonly editandoId    = signal<number | null>(null);
  readonly novoValorEdit = signal('');
  readonly excluindoId   = signal<number | null>(null);

  readonly receita = computed(() => this.resumo().receita);

  private get headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${environment.adminToken}` });
  }

  ngOnInit(): void {
    const unidadeSalva = sessionStorage.getItem('getgym_unidade_financeiro') as Unidade | null;
    const tokenSalvo   = localStorage.getItem('getgym_token');
    if (unidadeSalva && tokenSalvo) {
      this.unidadeSelecionada.set(unidadeSalva);
      this.isUnlocked.set(true);
      this.carregarDadosFinanceiros();
    }
  }

  unlock(): void {
    this.http.post<any>(`${environment.apiUrl}/api/auth/financeiro`, { pin: this.pinInput() })
      .subscribe({
        next: () => {
          sessionStorage.setItem('getgym_unidade_financeiro', this.unidadeSelecionada());
          this.isUnlocked.set(true);
          this.errorMessage.set('');
          this.pinInput.set('');
          this.carregarDadosFinanceiros();
        },
        error: () => {
          this.errorMessage.set('PIN incorreto.');
          this.pinInput.set('');
        }
      });
  }

  lock(): void {
    sessionStorage.removeItem('getgym_unidade_financeiro');
    this.isUnlocked.set(false);
  }

  mudarUnidade(unidade: Unidade): void {
    this.unidadeSelecionada.set(unidade);
    sessionStorage.setItem('getgym_unidade_financeiro', unidade);
    this.carregarDadosFinanceiros();
  }

  carregarDadosFinanceiros(): void {
    this.http.get<any>(`${environment.apiUrl}/api/financeiro/dados?unidade=${this.unidadeSelecionada()}`, { headers: this.headers })
      .subscribe({
        next: (dados) => {
          this.despesas.set(dados.despesas);
          this.resumo.set(dados.resumo);
          this.planos.set([
            { nome: 'Anual Premium', percent: dados.planDistribution.anual },
            { nome: 'Semestral PRO', percent: dados.planDistribution.semestral },
            { nome: 'Mensal Flex',   percent: dados.planDistribution.mensal },
          ]);
        },
        error: () => {}
      });
  }

  abrirModal(): void {
    this.novaDespesa.set({ categoria: '', vencimento: '', valor: null, status: 'Pendente' });
    this.modalAberto.set(true);
  }

  salvarDespesa(): void {
    const d = this.novaDespesa();
    if (!d.categoria || !d.valor || !d.vencimento) return;
    this.http.post(`${environment.apiUrl}/api/financeiro/despesas`, { ...d, unidade: this.unidadeSelecionada() }, { headers: this.headers })
      .subscribe({
        next: () => { this.modalAberto.set(false); this.carregarDadosFinanceiros(); },
        error: () => {}
      });
  }

  mudarStatus(despesa: Despesa): void {
    const novoStatus = despesa.status === 'Pago' ? 'Pendente' : 'Pago';
    this.despesas.update(lista =>
      lista.map(d => d.id === despesa.id ? { ...d, status: novoStatus as 'Pago' | 'Pendente' } : d)
    );
    this.http.put(`${environment.apiUrl}/api/despesas/${despesa.id}`, { status: novoStatus })
      .subscribe({ error: () => {} });
  }

  iniciarEdicao(despesa: Despesa): void {
    this.excluindoId.set(null);
    this.editandoId.set(despesa.id);
    this.novoValorEdit.set(String(despesa.valor));
  }

  onValorEditInput(event: Event): void {
    this.novoValorEdit.set((event.target as HTMLInputElement).value);
  }

  salvarEdicao(despesa: Despesa): void {
    const valor = parseFloat(this.novoValorEdit());
    if (isNaN(valor)) return;
    this.despesas.update(lista =>
      lista.map(d => d.id === despesa.id ? { ...d, valor } : d)
    );
    this.editandoId.set(null);
    this.http.put(`${environment.apiUrl}/api/financeiro/despesas/${despesa.id}`, { valor }, { headers: this.headers })
      .subscribe({ error: () => {} });
  }

  cancelarEdicao(): void {
    this.editandoId.set(null);
    this.novoValorEdit.set('');
  }

  pedirConfirmacaoExclusao(id: number): void {
    this.editandoId.set(null);
    this.excluindoId.set(id);
  }

  confirmarExclusao(): void {
    const id = this.excluindoId();
    if (id === null) return;
    this.despesas.update(lista => lista.filter(d => d.id !== id));
    this.excluindoId.set(null);
    this.http.delete(`${environment.apiUrl}/api/financeiro/despesas/${id}`, { headers: this.headers })
      .subscribe({ error: () => {} });
  }

  cancelarExclusao(): void {
    this.excluindoId.set(null);
  }

  statusBadgeClass(status: string): string {
    return status === 'Pago'
      ? 'financial__status-badge financial__status-badge--pago'
      : 'financial__status-badge financial__status-badge--pendente';
  }

  onPinInput(event: Event): void {
    this.pinInput.set((event.target as HTMLInputElement).value);
  }

  onNovaDespesaField(field: string, value: string): void {
    this.novaDespesa.update(d => ({ ...d, [field]: field === 'valor' ? parseFloat(value) || null : value }));
  }
}
