import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-staff-schedule',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div style="padding: 30px; background-color: #f8f9fa; min-height: 100vh;">
      <h2 style="color: #1e293b; margin-bottom: 20px;">Equipe e Horários - Unidade Fazendinha</h2>
      
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
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class StaffScheduleComponent implements OnInit {
  profissionais: any[] = [];
  unidadeLogada = 'Fazendinha'; // No futuro, isso virá do Login

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(`http://localhost:5000/api/profissionais?unidade=${this.unidadeLogada}`)
      .subscribe(dados => this.profissionais = dados);
  }
}