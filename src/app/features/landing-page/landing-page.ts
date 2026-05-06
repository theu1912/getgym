import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero';
// 1. Importe o nosso novo componente de preços
import { PricingComponent } from './components/pricing/pricing';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  // 2. Injete ele aqui no array para que o HTML o reconheça
  imports: [HeroComponent, PricingComponent],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPageComponent { }