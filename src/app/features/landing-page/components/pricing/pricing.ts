import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss'
})
export class PricingComponent {
  private router = inject(Router);
  
  plans = [
    {
      name: 'Mensal Flex',
      price: '119,90',
      period: '/mês',
      highlight: false,
      features: [
        'Sem fidelidade ou multa rescisória', 
        'Acesso livre a maquinário', 
        'Montagem de treino inclusa', 
        'Acesso às aulas coletivas'
      ]
    },
    {
      name: 'Semestral PRO',
      badge: 'Mais Popular',
      price: '99,90',
      period: '/mês',
      highlight: true, 
      features: [
        'Acesso livre em qualquer horário', 
        'Montagem de treino inclusa', 
        'Acesso a todas as aulas coletivas', 
        'Zero taxa de matrícula',
        'Avaliação física a cada 3 meses'
      ]
    },
    {
      name: 'Anual Premium',
      price: '79,90',
      period: '/mês',
      highlight: false,
      features: [
        'Acesso em horário livre', 
        'Acesso livre a maquinário e pesos livres', 
        'Armários rotativos'
      ]
    }
  ];

  garantirPlano(planoNome: string): void {
    // Redireciona para a nova página de checkout e rola para o topo suavemente
    this.router.navigate(['/checkout']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}