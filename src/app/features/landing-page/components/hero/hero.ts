import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent {
  
  // Injeção de dependência moderna do Angular
  private viewportScroller = inject(ViewportScroller);
  
  scrollToPricing(): void {
    // Procura na tela um elemento com o ID 'planos' e rola até ele
    this.viewportScroller.scrollToAnchor('planos');
  }
}