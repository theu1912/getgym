import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Metricas {
  inscricoesHoje: number;
  alunosAtivos: number;
  acessosCatraca: number;
  cancelamentos: number;
}

interface PeakHour {
  time: string;
  visitors: number;
}

interface OrigemItem {
  quantidade: number;
  porcentagem: number;
}

interface Origens {
  site:       OrigemItem;
  presencial: OrigemItem;
  gympass:    OrigemItem;
}

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './dashboard-overview.html',
  styleUrl: './dashboard-overview.scss'
})
export class DashboardOverviewComponent implements OnInit {
  private readonly http = inject(HttpClient);

  readonly peakHours = signal<PeakHour[]>([]);
  readonly metricas  = signal<Metricas>({ inscricoesHoje: 0, alunosAtivos: 0, acessosCatraca: 0, cancelamentos: 0 });
  readonly origens   = signal<Origens>({
    site:       { quantidade: 0, porcentagem: 0 },
    presencial: { quantidade: 0, porcentagem: 0 },
    gympass:    { quantidade: 0, porcentagem: 0 }
  });

  readonly metaMensal = signal(100);
  readonly maxVisitors = computed(() => Math.max(...this.peakHours().map(h => h.visitors), 1));
  readonly percentualMeta = computed(() =>
    Math.min(Math.round((this.metricas().alunosAtivos / this.metaMensal()) * 100), 999)
  );

  private get headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${environment.adminToken}` });
  }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.http.get<any>(`${environment.apiUrl}/api/dashboard/visao-geral`, { headers: this.headers })
      .subscribe({
        next: (dados) => {
          this.metricas.set(dados.metricas);
          this.peakHours.set(dados.peakHours);
          this.origens.set(dados.origens);
        },
        error: () => {}
      });
  }

  barHeight(visitors: number): number {
    return Math.min((visitors / this.maxVisitors()) * 100, 100);
  }
}
