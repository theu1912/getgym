import { Component, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  readonly nome = signal('');
  readonly telefone = signal('');
  readonly unidade = signal('Fazendinha');
  readonly plano = signal('Mensal Flex');

  readonly enviando = signal(false);
  readonly erro = signal('');

  readonly botaoDesabilitado = computed(
    () => this.enviando() || !this.nome().trim() || !this.telefone().trim()
  );

  voltar(): void {
    this.router.navigate(['/']);
  }

  cadastrarAluno(): void {
    this.erro.set('');

    if (!this.nome().trim()) {
      this.erro.set('Por favor, informe seu nome completo.');
      return;
    }
    if (!this.telefone().trim()) {
      this.erro.set('Por favor, informe seu telefone.');
      return;
    }

    this.enviando.set(true);

    const payload = {
      nome: this.nome(),
      telefone: this.telefone(),
      unidade: this.unidade(),
      plano: this.plano()
    };

    this.http.post(`${environment.apiUrl}/api/matriculas`, payload).subscribe({
      next: () => {
        this.enviando.set(false);
        this.router.navigate(['/confirmacao']);
      },
      error: (err) => {
        this.enviando.set(false);
        this.erro.set(err?.error?.mensagem || 'Ops! Algo deu errado. Tente novamente.');
        console.error('Erro na matrícula', err);
      }
    });
  }
}
