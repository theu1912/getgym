import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss'
})
export class PricingComponent {
  
  // Array de dados simulando um retorno de banco de dados
  plans = [
    {
      name: 'Plano Básico',
      price: '79,90',
      period: '/mês',
      highlight: false,
      features: [
        'Acesso em horário reduzido (10h às 16h)', 
        'Acesso livre a maquinário e pesos livres', 
        'Armários rotativos rotineiros'
      ],
      whatsappMessage: 'Olá! Estava no site e quero garantir o meu Plano Básico.'
    },
    {
      name: 'Anual Premium',
      badge: 'Mais Popular',
      price: '99,90',
      period: '/mês',
      highlight: true, // Este booleano ativa o destaque via CSS
      features: [
        'Acesso livre em qualquer horário', 
        'Montagem de treino inclusa', 
        'Acesso a todas as aulas coletivas', 
        'Zero taxa de matrícula',
        'Avaliação física a cada 3 meses'
      ],
      whatsappMessage: 'Olá! Estava no site e quero garantir o meu Plano Anual Premium.'
    },
    {
      name: 'Mensal Flex',
      price: '149,90',
      period: '/mês',
      highlight: false,
      features: [
        'Sem fidelidade ou multa rescisória', 
        'Acesso livre a maquinário', 
        'Montagem de treino inclusa', 
        'Acesso às aulas coletivas'
      ],
      whatsappMessage: 'Olá! Estava no site e quero garantir o meu Plano Mensal Flex.'
    }
  ];

  redirectToWhatsApp(message: string): void {
    const gymPhone = '5541984496767'; 
    const whatsappUrl = `https://wa.me/${gymPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }
}