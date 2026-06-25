import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-students-table',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div style="padding: 30px; background-color: #f8f9fa; min-height: 100vh;">
      <h2 style="font-size: 1.5em; font-weight: bold; color: #1e293b; margin-bottom: 20px;">Gestão de Alunos</h2>

      <div *ngIf="erro" style="background: #fee2e2; color: #991b1b; padding: 12px 20px; border-radius: 6px; margin-bottom: 16px;">
        {{ erro }}
      </div>

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
              <td style="padding: 15px 20px;">
                <span style="background: #d1fae5; color: #10b981; padding: 4px 10px; border-radius: 20px; font-weight: bold; font-size: 0.8em;">
                  {{ student.status }}
                </span>
              </td>
            </tr>
            <tr *ngIf="students.length === 0 && !carregando">
              <td colspan="5" style="text-align: center; padding: 40px; color: #94a3b8;">
                Nenhum aluno encontrado.
              </td>
            </tr>
            <tr *ngIf="carregando">
              <td colspan="5" style="text-align: center; padding: 40px; color: #94a3b8;">
                Carregando...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class StudentsTableComponent implements OnInit {
  students: any[] = [];
  carregando = true;
  erro = '';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  private get headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${environment.adminToken}` });
  }

  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/api/alunos`, { headers: this.headers })
      .subscribe({
        next: (dados) => {
          this.students  = dados;
          this.carregando = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.carregando = false;
          this.erro = 'Erro ao carregar alunos. Verifique se o backend está rodando.';
          console.error('Erro:', err);
          this.cdr.detectChanges();
        }
      });
  }
}
