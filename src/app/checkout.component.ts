import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="display: flex; flex-direction: column; min-height: 100vh; font-family: 'Segoe UI', sans-serif; background-color: #121212; color: #e0e0e0;">
      <header style="background-color: #1a1a1a; padding: 20px 40px; border-bottom: 2px solid #2d2d2d; display: flex; justify-content: space-between; align-items: center;">
        <h1 style="color: #72b146; margin: 0; font-size: 1.8em; letter-spacing: 1px; cursor: pointer;" (click)="voltar()">GETGYM</h1>
        <button (click)="voltar()" style="background: transparent; color: #aaa; border: 1px solid #444; padding: 8px 15px; border-radius: 4px; cursor: pointer;">Voltar ao Site</button>
      </header>

      <main style="flex: 1; padding: 40px 20px; max-width: 1000px; margin: 0 auto; width: 100%; box-sizing: border-box;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h2 style="color: white; font-size: 2.5em; margin-bottom: 10px;">Assine agora. Treine hoje.</h2>
          <p style="color: #aaa; font-size: 1.1em;">Processo 100% automatizado. Sem filas, sem WhatsApp.</p>
        </div>

        <div style="background: #1e1e1e; padding: 40px; border-radius: 12px; border: 1px solid #333; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <form (ngSubmit)="cadastrarAluno()" style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
            <div style="display: flex; flex-direction: column; gap: 15px;">
              <h3 style="color: #72b146; margin: 0 0 10px 0; border-bottom: 1px solid #333; padding-bottom: 10px;">1. Seus Dados</h3>
              <div>
                <label style="display: block; font-size: 0.9em; margin-bottom: 5px; color: #ccc;">Nome Completo</label>
                <input type="text" [(ngModel)]="novoAluno.nome" name="nome" required placeholder="Digite seu nome" style="width: 100%; padding: 12px; background: #2d2d2d; border: 1px solid #444; color: white; border-radius: 6px; box-sizing: border-box;">
              </div>
              <div>
                <label style="display: block; font-size: 0.9em; margin-bottom: 5px; color: #ccc;">Telefone (WhatsApp)</label>
                <input type="text" [(ngModel)]="novoAluno.telefone" name="telefone" required placeholder="(41) 99999-9999" style="width: 100%; padding: 12px; background: #2d2d2d; border: 1px solid #444; color: white; border-radius: 6px; box-sizing: border-box;">
              </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 15px;">
              <h3 style="color: #72b146; margin: 0 0 10px 0; border-bottom: 1px solid #333; padding-bottom: 10px;">2. Escolha seu Treino</h3>
              <div>
                <label style="display: block; font-size: 0.9em; margin-bottom: 5px; color: #ccc;">Unidade de Treino</label>
                <select [(ngModel)]="novoAluno.unidade" name="unidade" style="width: 100%; padding: 12px; background: #2d2d2d; border: 1px solid #444; color: white; border-radius: 6px; box-sizing: border-box;">
                  <option value="Fazendinha">Fazendinha (Matriz)</option>
                  <option value="Piraquara">Piraquara</option>
                  <option value="Pinhais">Pinhais</option>
                </select>
              </div>
              <div>
                <label style="display: block; font-size: 0.9em; margin-bottom: 5px; color: #ccc;">Plano Desejado</label>
                <select [(ngModel)]="novoAluno.plano" name="plano" style="width: 100%; padding: 12px; background: #2d2d2d; border: 1px solid #444; color: white; border-radius: 6px; box-sizing: border-box;">
                  <option value="Mensal Flex">Mensal Flex - R$ 119,90/mês</option>
                  <option value="Semestral PRO">Semestral PRO - R$ 99,90/mês</option>
                  <option value="Anual Premium">Anual Premium - R$ 79,90/mês</option>
                </select>
              </div>
            </div>

            <div style="grid-column: span 2; margin-top: 20px;">
              <button type="submit" style="width: 100%; background-color: #72b146; color: white; padding: 15px; border: none; border-radius: 6px; font-size: 1.2em; font-weight: bold; cursor: pointer;">Finalizar Matrícula</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  `
})
export class CheckoutComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  novoAluno = {
    nome: '',
    telefone: '',
    unidade: 'Fazendinha',
    plano: 'Mensal Flex',
    status: 'Em dia', 
    dias_ausente: 0
  };

  voltar() {
    this.router.navigate(['/']);
  }

  cadastrarAluno() {
    // O seu HTML já chama o cadastrarAluno() no botão (ngSubmit).
    // Aqui enviamos o objeto novoAluno inteiro direto para a API em Python
    this.http.post('http://localhost:5000/api/matriculas', this.novoAluno)
      .subscribe({
        next: (resposta) => {
          alert('Matrícula realizada com sucesso! Bem-vindo à Getgym.');
          this.router.navigate(['/admin/alunos']); // Manda o Felipeira direto pra tabela pra ver o aluno novo
        },
        error: (erro) => {
          console.error('Erro na matrícula:', erro);
          alert('Falha ao comunicar com o servidor. Verifique se o Back-end (Python) está rodando na porta 5000.');
        }
      });
  }
}