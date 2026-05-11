import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .dashboard-container { padding: 30px; background-color: #f8f9fa; min-height: 100vh; font-family: 'Segoe UI', sans-serif; }
    .header-title { font-size: 1.8em; font-weight: bold; color: #1e293b; margin-bottom: 30px; }

    /* Estilo Inspirado no Von Barbarov - Cards com Borda Superior */
    .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 30px; }
    .card { background: #fff; padding: 25px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); position: relative; overflow: hidden; }
    .card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; }
    .card.blue::before { background-color: #3b82f6; }
    .card.red::before { background-color: #ef4444; }
    .card.green::before { background-color: #10b981; }
    .card.yellow::before { background-color: #f59e0b; }

    .card-title { font-size: 0.85em; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
    .card-value { font-size: 2.2em; font-weight: bold; color: #0f172a; }
    .card-sub { font-size: 0.85em; color: #10b981; font-weight: 600; margin-top: 8px; display: flex; align-items: center; gap: 4px; }
    .card-sub.negative { color: #ef4444; }

    /* Paineis Principais de Dados */
    .panels-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
    .panel { background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
    
    /* Tipografia Elegante para Títulos de Seção */
    .panel-header { font-family: 'Georgia', serif; font-size: 1.5em; color: #1e293b; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
    .panel-subtitle { font-family: 'Segoe UI', sans-serif; font-size: 0.6em; color: #64748b; font-weight: normal; text-transform: uppercase; letter-spacing: 1px; }

    /* Gráfico de Horários de Pico (CSS Puro) */
    .chart-wrapper { height: 220px; display: flex; align-items: flex-end; gap: 15px; padding-top: 20px; }
    .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 10px; }
    .bar-bg { width: 100%; height: 160px; background-color: #f8fafc; border-radius: 6px; position: relative; display: flex; align-items: flex-end; }
    .bar-fill { width: 100%; background-color: #10b981; border-radius: 6px; transition: height 0.8s ease; }
    .bar-fill.high { background-color: #ef4444; } /* Horário de lotação máxima */
    .bar-fill.medium { background-color: #f59e0b; }
    .bar-label { font-size: 0.85em; color: #64748b; font-weight: bold; }
    .bar-value { position: absolute; top: -25px; width: 100%; text-align: center; font-size: 0.85em; font-weight: bold; color: #0f172a; }

    /* Lista de Origem de Inscrições */
    .source-list { list-style: none; padding: 0; margin: 0; }
    .source-item { display: flex; justify-content: space-between; align-items: center; padding: 18px 0; border-bottom: 1px dashed #e2e8f0; }
    .source-item:last-child { border-bottom: none; }
    .source-info { display: flex; align-items: center; gap: 12px; font-weight: 600; color: #334155; }
    .dot { width: 12px; height: 12px; border-radius: 50%; }
    .dot.site { background-color: #3b82f6; }
    .dot.presencial { background-color: #f59e0b; }
    .dot.gympass { background-color: #ef4444; }
    .source-number { font-weight: bold; color: #0f172a; font-size: 1.2em; }
    .source-percent { font-size: 0.7em; color: #94a3b8; font-weight: normal; margin-left: 8px; }
  `],
  template: `
    <div class="dashboard-container">
      <h2 class="header-title">Visão Estratégica</h2>

      <div class="metrics-grid">
        <div class="card blue">
          <div class="card-title">Inscrições Hoje</div>
          <div class="card-value">24</div>
          <div class="card-sub">↗ +4 comparado a ontem</div>
        </div>
        
        <div class="card green">
          <div class="card-title">Alunos Ativos</div>
          <div class="card-value">1.248</div>
          <div class="card-sub">↗ 92% da meta mensal</div>
        </div>

        <div class="card yellow">
          <div class="card-title">Acessos na Catraca</div>
          <div class="card-value">412</div>
          <div class="card-sub">Até o momento</div>
        </div>

        <div class="card red">
          <div class="card-title">Cancelamentos (30d)</div>
          <div class="card-value">12</div>
          <div class="card-sub negative">↘ Ação de resgate necessária</div>
        </div>
      </div>

      <div class="panels-grid">
        <div class="panel">
          <div class="panel-header">
            Mapa de Calor diário
            <span class="panel-subtitle">Horários de Pico (Hoje)</span>
          </div>
          
          <div class="chart-wrapper">
            <div class="bar-col" *ngFor="let peak of peakHours">
              <div class="bar-bg">
                <div class="bar-value">{{ peak.visitors }}</div>
                <div class="bar-fill" 
                     [style.height.%]="(peak.visitors / maxVisitors) * 100"
                     [ngClass]="{'high': peak.visitors > 100, 'medium': peak.visitors > 50 && peak.visitors <= 100}">
                </div>
              </div>
              <div class="bar-label">{{ peak.time }}</div>
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-header">
            Origem das Matrículas
            <span class="panel-subtitle">Últimos 7 dias</span>
          </div>
          
          <ul class="source-list">
            <li class="source-item">
              <div class="source-info">
                <span class="dot site"></span> Site Oficial (Landing Page)
              </div>
              <div>
                <span class="source-number">68</span>
                <span class="source-percent">(55%)</span>
              </div>
            </li>
            <li class="source-item">
              <div class="source-info">
                <span class="dot presencial"></span> Balcão / Presencial
              </div>
              <div>
                <span class="source-number">42</span>
                <span class="source-percent">(35%)</span>
              </div>
            </li>
            <li class="source-item">
              <div class="source-info">
                <span class="dot gympass"></span> Plataformas (Gympass)
              </div>
              <div>
                <span class="source-number">12</span>
                <span class="source-percent">(10%)</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
  `
})
export class OverviewComponent {
  // Dados simulados para gerar o gráfico de barras
  peakHours = [
    { time: '06h', visitors: 45 },
    { time: '08h', visitors: 85 },
    { time: '10h', visitors: 30 },
    { time: '12h', visitors: 65 },
    { time: '15h', visitors: 25 },
    { time: '18h', visitors: 140 }, // Lotação máxima
    { time: '20h', visitors: 110 },
    { time: '22h', visitors: 40 }
  ];

  maxVisitors = 150; // Usado para calcular a porcentagem da barra
}