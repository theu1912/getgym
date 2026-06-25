import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-staff-schedule',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div style="padding: 30px; background-color: #f8f9fa; min-height: 100vh;">
      <h2 style="color: #1e293b; margin-bottom: 20px;">Equipe e Horários — {{ unidadeSelecionada }}</h2>

      <!-- Seletor de unidade -->
      <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
        <button *ngFor="let u of unidades" (click)="mudarUnidade(u)"
                [style.background]="unidadeSelecionada === u ? '#2d3436' : '#f1f5f9'"
                [style.color]="unidadeSelecionada === u ? 'white' : '#334155'"
                style="border: 1px solid #e2e8f0; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 0.9em;">
          {{ u }}
        </button>
      </div>

      <div *ngIf="erro" style="background: #fee2e2; color: #991b1b; padding: 12px 20px; border-radius: 6px; margin-bottom: 16px;">
        {{ erro }}
      </div>

      <div style="background: white; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="background: #f1f5f9; color: #64748b; font-size: 0.85em;">
              <th style="padding: 15px 20px;">PROFISSIONAL</th>
              <th style="padding: 15px 20px;">CARGO</th>
              <th style="padding: 15px 20px;">TURNO</th>
              <th style="padding: 15px 20px;">DIAS</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of profissionais" style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 15px 20px; font-weight: bold; color: #1e293b;">{{ p.nome }}</td>
              <td style="padding: 15px 20px;"><span style="background: #e2e8f0; padding: 4px 10px; border-radius: 4px; font-size: 0.85em;">{{ p.cargo }}</span></td>
              <td style="padding: 15px 20px; color: #72b146; font-weight: bold;">{{ p.inicio }} - {{ p.fim }}</td>
              <td style="padding: 15px 20px; color: #64748b;">{{ p.dias }}</td>
            </tr>
            <tr *ngIf="profissionais.length === 0 && !carregando">
              <td colspan="4" style="text-align: center; padding: 30px; color: #94a3b8;">
                Nenhum profissional cadastrado para esta unidade.
              </td>
            </tr>
            <tr *ngIf="carregando">
              <td colspan="4" style="text-align: center; padding: 30px; color: #94a3b8;">Carregando...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class StaffScheduleComponent implements OnInit {
  unidades = ['Fazendinha', 'Piraquara', 'Pinhais'];
  unidadeSelecionada = 'Fazendinha';
  profissionais: any[] = [];
  carregando = true;
  erro = '';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  private get headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${environment.adminToken}` });
  }

  ngOnInit() {
    this.carregarProfissionais();
  }

  mudarUnidade(unidade: string) {
    this.unidadeSelecionada = unidade;
    this.carregarProfissionais();
  }

  carregarProfissionais() {
    this.carregando = true;
    this.erro = '';
    this.http.get<any[]>(`${environment.apiUrl}/api/profissionais?unidade=${this.unidadeSelecionada}`, { headers: this.headers })
      .subscribe({
        next: (dados) => {
          this.profissionais = dados;
          this.carregando = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.carregando = false;
          this.erro = 'Erro ao carregar profissionais.';
          console.error(err);
          this.cdr.detectChanges();
        }
      });
  }
}
