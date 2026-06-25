import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    .page-container { padding: 30px; font-family: 'Segoe UI', sans-serif; background-color: #f8f9fa; min-height: 100vh; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .table-container { background: white; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); overflow: hidden; }
    table { width: 100%; border-collapse: collapse; text-align: left; }
    th { padding: 18px 20px; color: #64748b; font-size: 0.85em; text-transform: uppercase; border-bottom: 2px solid #f1f5f9; }
    td { padding: 16px 20px; border-bottom: 1px solid #f1f5f9; color: #334155; }
    .expand-btn { background: none; border: none; cursor: pointer; color: #72b146; transition: 0.3s; padding: 5px; vertical-align: middle; }
    .expand-btn.active { transform: rotate(90deg); }
    .details-row { background-color: #fcfdfc; }
    .student-list-container { padding: 15px 40px; border-left: 4px solid #72b146; margin: 10px 20px; background: #fff; border-radius: 4px; }
    .student-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 0.9em; }
    .student-item:last-child { border-bottom: none; }
    .absent-warning { color: #ef4444; font-weight: bold; }
    .action-btn { background: none; border: none; color: #94a3b8; cursor: pointer; font-weight: 600; margin-left: 10px; }
    .action-btn:hover { color: #3b82f6; text-decoration: underline; }
    .modal-overlay { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center; z-index:1001; }
    .modal-card { background: white; padding: 30px; border-radius: 8px; width: 400px; }
    .modal-input { width: 100%; margin: 8px 0; padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px; box-sizing: border-box; }
  `],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h2 style="font-size: 1.5em; font-weight: bold; color: #1e293b;">Grade de Aulas Coletivas</h2>
        <button (click)="abrirModal()" style="background-color: #72b146; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-weight: bold;">+ Nova Aula</button>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Horário</th>
              <th>Modalidade</th>
              <th>Professor</th>
              <th>Lotação / Alunos</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody *ngFor="let aula of aulas">
            <tr>
              <td><strong>{{ aula.horario }}</strong></td>
              <td>{{ aula.modalidade }}</td>
              <td>{{ aula.professor }}</td>
              <td>
                <button class="expand-btn" [class.active]="aula.expandido" (click)="aula.expandido = !aula.expandido">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M9 18l6-6-6-6"/></svg>
                </button>
                {{ aula.alunos.length }} / {{ aula.vagas }}
              </td>
              <td>
                <button class="action-btn" (click)="editarAula(aula)">Editar</button>
                <button class="action-btn" (click)="excluirAula(aula.id)" style="color: #ef4444;">Excluir</button>
              </td>
            </tr>
            <tr *ngIf="aula.expandido" class="details-row">
              <td colspan="5">
                <div class="student-list-container">
                  <strong style="display:block; margin-bottom:10px; color:#64748b; font-size:0.8em; text-transform:uppercase;">Lista de Alunos e Frequência</strong>
                  <div class="student-item" *ngFor="let aluno of aula.alunos">
                    <span>{{ aluno.nome }}</span>
                    <span [class.absent-warning]="aluno.diasAusente > 7">
                      {{ aluno.diasAusente === 0 ? 'Presente hoje' : 'Ausente há ' + aluno.diasAusente + ' dias' }}
                    </span>
                  </div>
                  <div *ngIf="aula.alunos.length === 0" style="color: #94a3b8; font-size: 0.9em;">
                    Nenhum aluno inscrito ainda.
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="modal-overlay" *ngIf="modalAberto">
      <div class="modal-card">
        <h3 style="margin-top: 0;">{{ editando ? 'Editar Aula' : 'Nova Aula' }}</h3>
        <input class="modal-input" [(ngModel)]="aulaAtual.horario" type="time">
        <input class="modal-input" [(ngModel)]="aulaAtual.modalidade" placeholder="Modalidade (ex: Spinning)">
        <input class="modal-input" [(ngModel)]="aulaAtual.professor" placeholder="Professor">
        <input class="modal-input" [(ngModel)]="aulaAtual.vagas" type="number" min="1" placeholder="Vagas">
        <div *ngIf="erroModal" style="color: #ef4444; font-size: 0.85em; margin-bottom: 8px;">{{ erroModal }}</div>
        <button (click)="salvarAula()" style="width:100%; background:#72b146; color:white; border:none; padding:12px; margin-top:10px; cursor:pointer; border-radius: 6px;">Salvar</button>
        <button (click)="modalAberto = false" style="width:100%; background:#f1f5f9; border:none; padding:10px; margin-top:5px; cursor:pointer; border-radius: 6px;">Cancelar</button>
      </div>
    </div>
  `
})
export class ScheduleComponent {
  aulas = [
    {
      id: 1, horario: '06:45', modalidade: 'Spinning', professor: 'Carlos', vagas: 20, expandido: false,
      alunos: [
        { nome: 'Matheus Machado', diasAusente: 0 },
        { nome: 'Felipe Pereira',  diasAusente: 12 },
        { nome: 'Vitoria Souza',   diasAusente: 2 }
      ]
    },
    {
      id: 2, horario: '18:30', modalidade: 'Ritmos', professor: 'Amanda', vagas: 30, expandido: false,
      alunos: [
        { nome: 'Mariana Costa',  diasAusente: 0 },
        { nome: 'Lucas Ferreira', diasAusente: 15 }
      ]
    }
  ];

  modalAberto = false;
  editando = false;
  erroModal = '';
  aulaAtual: any = { id: null, horario: '', modalidade: '', professor: '', alunos: [], vagas: 20 };

  /** Gera um ID seguro que nunca colide com os existentes */
  private proximoId(): number {
    return this.aulas.length > 0 ? Math.max(...this.aulas.map(a => a.id)) + 1 : 1;
  }

  abrirModal() {
    this.editando = false;
    this.erroModal = '';
    this.aulaAtual = { id: null, horario: '', modalidade: '', professor: '', alunos: [], vagas: 20 };
    this.modalAberto = true;
  }

  editarAula(aula: any) {
    this.editando = true;
    this.erroModal = '';
    this.aulaAtual = { ...aula };
    this.modalAberto = true;
  }

  salvarAula() {
    if (!this.aulaAtual.horario || !this.aulaAtual.modalidade || !this.aulaAtual.professor) {
      this.erroModal = 'Preencha horário, modalidade e professor.';
      return;
    }

    if (this.editando) {
      const index = this.aulas.findIndex(a => a.id === this.aulaAtual.id);
      if (index !== -1) {
        this.aulas[index] = { ...this.aulaAtual };
      }
    } else {
      this.aulas.push({ ...this.aulaAtual, id: this.proximoId(), expandido: false });
    }
    this.modalAberto = false;
  }

  excluirAula(id: number) {
    if (confirm('Deseja excluir esta aula?')) {
      this.aulas = this.aulas.filter(a => a.id !== id);
    }
  }
}
