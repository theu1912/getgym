import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.scss'
})
export class FaqComponent {
  faqs = [
    { 
      question: 'A montagem do treino com os professores está inclusa?', 
      answer: 'Sim! Em todos os nossos planos, você tem direito a uma avaliação inicial e montagem de treino personalizada com nossos instrutores.', 
      open: false 
    },
    { 
      question: 'Como funciona o cancelamento do plano Mensal Flex?', 
      answer: 'O plano Mensal Flex não possui fidelidade. Você pode solicitar o cancelamento a qualquer momento na recepção, sem multa rescisória, com aviso prévio de 30 dias.', 
      open: false 
    },
    { 
      question: 'A academia possui área de peso livre isolada?', 
      answer: 'Com certeza. Contamos com um espaço dedicado exclusivamente aos pesos livres, com halteres pesados, bancos, gaiolas de agachamento e plataformas de levantamento.', 
      open: false 
    },
    { 
      question: 'Posso treinar em qualquer unidade da Getgym?', 
      answer: 'O Plano Premium garante passe livre em todas as nossas unidades. Os demais planos garantem acesso exclusivo à sua unidade de matrícula.', 
      open: false 
    }
  ];

  toggleFaq(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
  }

  openWhatsAppSupport(): void {
    const gymPhone = '5541984496767'; // O número da recepção
    const msg = 'Olá! Li as perguntas frequentes no site, mas ainda tenho uma dúvida. Podem me ajudar?';
    window.open(`https://wa.me/${gymPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  }
}