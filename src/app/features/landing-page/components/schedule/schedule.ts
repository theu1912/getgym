import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .dashboard-container { padding: 30px; background-color: #f5f6fa; min-height: 100vh; font-family: 'Segoe UI', sans-serif; }
    .header-title { font-size: 1.5em; font-weight: bold; color: #333; margin-bottom: 20px; }
    .btn-add { background-color: #72b146; color: white; border: none; padding: 10px 20px; border-radius: 4px; font-weight: bold; cursor: pointer; float: right; transition: 0.2s; }
    .btn-add:hover { background-color: #5d9635; }
    
    .table-container { background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); overflow: hidden; clear: both; margin-top: 20px; }
    table { width: 100%; border-collapse: collapse; text-align: left; }
    th { background-color: #fafafa; padding: 15px 20px; color: #888; font-size: 0.85em; text-transform: uppercase; border-bottom: 1px solid #eee; }
    td { padding: 15px 20px; border-bottom: 1px solid #eee; color: #333; font-weight: 500; }
    tr:last-child td { border-bottom: none; }
    
    .badge { padding: 5px 10px; border-radius: 20px; font-size: 0.8em; font-weight: bold; }
    .badge-spinning { background: #e0f2f1; color: #00897b; }
    .badge-ritmos { background: #fce4ec; color: #d81b60; }
    .badge-jump { background: #fff3e0; color: #e65100; }
    
    .action-btn { background: transparent; border: none; color: #aaa; cursor: pointer; font-weight: bold; margin-right: 15px; transition: 0.2s; }
    .action-btn:hover { color: #2d3436; }
    .action-delete:hover { color: #d63031; }
  `],
  template: `
    <div class="dashboard-container">
      <div style="overflow: hidden;">
        <h2 class="header-title" style="float: left;">Grade de Aulas Coletivas</h2>
        <button class="btn-add">+ Cadastrar Nova Aula</button>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Horário</th>
              <th>Modalidade</th>
              <th>Professor</th>
              <th>Lotação / Vagas</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let aula of aulas">
              <td>{{ aula.horario }}</td>
              <td><span class="badge" [ngClass]="aula.classeBadge">{{ aula.modalidade }}</span></td>
              <td>{{ aula.professor }}</td>
              <td>{{ aula.lotacao }} / {{ aula.capacidadeMax }}</td>
              <td>
                <button class="action-btn">Editar</button>
                <button class="action-btn action-delete">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ScheduleComponent {
  // Lista simulando dados vindos do banco PostgreSQL
  aulas = [
    { horario: '06:45', modalidade: 'Spinning', professor: 'Carlos', lotacao: 18, capacidadeMax: 20, classeBadge: 'badge-spinning' },
    { horario: '18:30', modalidade: 'Ritmos (Dança)', professor: 'Amanda', lotacao: 25, capacidadeMax: 30, classeBadge: 'badge-ritmos' },
    { horario: '19:30', modalidade: 'Jump', professor: 'Carlos', lotacao: 15, capacidadeMax: 15, classeBadge: 'badge-jump' },
    { horario: '20:30', modalidade: 'Spinning', professor: 'Roberto', lotacao: 12, capacidadeMax: 20, classeBadge: 'badge-spinning' }
  ];
}