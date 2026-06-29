import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';

type StatusAluno = 'Em dia' | 'Atrasado' | 'Inativo';

interface Aluno {
  id: number;
  nome: string;
  ultimoAcesso: string;
  plano: string;
  status: StatusAluno;
}

@Component({
  selector: 'app-students-table',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './students-table.html',
  styleUrl: './students-table.scss'
})
export class StudentsTableComponent implements OnInit {
  private readonly http = inject(HttpClient);

  readonly students = signal<Aluno[]>([]);
  readonly carregando = signal(true);
  readonly erro = signal('');
  readonly alunoSelecionado = signal<Aluno | null>(null);
  readonly statusEditando = signal<StatusAluno | null>(null);
  readonly opcoesStatus: StatusAluno[] = ['Em dia', 'Atrasado', 'Inativo'];

  ngOnInit(): void {
    this.http.get<Aluno[]>(`${environment.apiUrl}/api/alunos`)
      .subscribe({
        next: (dados) => {
          this.students.set(dados);
          this.carregando.set(false);
        },
        error: () => {
          this.carregando.set(false);
          this.erro.set('Erro ao carregar alunos. Verifique se o backend está rodando.');
        }
      });
  }

  abrirDrawer(aluno: Aluno): void {
    this.alunoSelecionado.set(aluno);
    this.statusEditando.set(aluno.status);
  }

  fecharDrawer(): void {
    this.alunoSelecionado.set(null);
    this.statusEditando.set(null);
  }

  onStatusChange(event: Event, aluno: Aluno): void {
    const novoStatus = (event.target as HTMLSelectElement).value as StatusAluno;
    this.statusEditando.set(novoStatus);
    this.students.update(lista =>
      lista.map(a => a.id === aluno.id ? { ...a, status: novoStatus } : a)
    );
    this.alunoSelecionado.set({ ...aluno, status: novoStatus });
    this.http.put(`${environment.apiUrl}/api/alunos/${aluno.id}/status`, { status: novoStatus })
      .subscribe({ error: () => {} });
  }

  exportarRelatorio(): void {
    const alunos = this.students();
    const cabecalho = 'ID,Nome,Matricula,Plano,Status\n';
    const linhas = alunos.map(a =>
      `${a.id},"${a.nome}","${a.ultimoAcesso}","${a.plano}","${a.status}"`
    ).join('\n');
    const blob = new Blob([cabecalho + linhas], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `alunos-getgym-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  badgeClass(status: StatusAluno): string {
    const map: Record<StatusAluno, string> = {
      'Em dia':   'students__badge students__badge--em-dia',
      'Atrasado': 'students__badge students__badge--atrasado',
      'Inativo':  'students__badge students__badge--inativo',
    };
    return map[status] ?? 'students__badge';
  }
}
