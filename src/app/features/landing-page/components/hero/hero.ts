import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent {
  redirectToWhatsApp(): void {
    const gymPhone = '5541984496767'; 
    const customMessage = 'Olá! Gostaria de conhecer a Getgym e entender melhor os planos.';
    const whatsappUrl = `https://wa.me/${gymPhone}?text=${encodeURIComponent(customMessage)}`;
    window.open(whatsappUrl, '_blank');
  }
}