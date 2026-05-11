import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-students-table',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div style="padding: 30px; background-color: #f8f9fa; min-height: 100vh;">
      <h2 style="font-size: 1.5em; font-weight: bold; color: #1e293b; margin-bottom: 20px;">Gestão de Alunos (Banco de Dados)</h2>
      <div style="background: white; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="padding: 15px 20px; color: #64748b; font-size: 0.85em;">ID</th>
              <th style="padding: 15px 20px; color: #64748b; font-size: 0.85em;">NOME</th>
              <th style="padding: 15px 20px; color: #64748b; font-size: 0.85em;">MATRÍCULA</th>
              <th style="padding: 15px 20px; color: #64748b; font-size: 0.85em;">PLANO</th>
              <th style="padding: 15px 20px; color: #64748b; font-size: 0.85em;">STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let student of students" style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 15px 20px; font-weight: bold;">{{ student.id }}</td>
              <td style="padding: 15px 20px; font-weight: bold;">{{ student.nome }}</td>
              <td style="padding: 15px 20px; color: #f59e0b;">{{ student.ultimoAcesso }}</td>
              <td style="padding: 15px 20px;">{{ student.plano }}</td>
              <td style="padding: 15px 20px;"><span style="background: #d1fae5; color: #10b981; padding: 4px 10px; border-radius: 20px; font-weight: bold; font-size: 0.8em;">{{ student.status }}</span></td>
            </tr>
            <tr *ngIf="students.length === 0">
              <td colspan="5" style="text-align: center; padding: 40px; color: #94a3b8;">Nenhum aluno encontrado. Verifique se o Back-end está rodando.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class StudentsTableComponent implements OnInit {
  students: any[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get<any[]>('http://localhost:5000/api/alunos').subscribe({
      next: (dados) => this.students = dados,
      error: (erro) => console.error('Erro:', erro)
    });
  }
}