import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  templateUrl: './dashboard-overview.html',
  styleUrl: './dashboard-overview.scss'
})
export class DashboardOverviewComponent {
  // KPIs Mockados
  totalAlunos = 1248;
  leadsSemana = 42;
  
  // KPIs de Inteligência Financeira e Retenção
  mensalidadesAtrasadas = 18;
  valorInadimplencia = 'R$ 1.845,00'; 
  alunosAusentes = 34; // Indicador de Risco de Churn (Cancelamento)
  
  // Proporção para o Gráfico de Barra
  percPremium = 65;
  percFlex = 35;
}