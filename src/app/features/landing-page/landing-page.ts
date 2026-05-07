import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero';
import { ServicesComponent } from './components/services/services';
import { GalleryComponent } from './components/gallery/gallery'; // Novo
import { LocationComponent } from './components/location/location'; // Novo
import { PricingComponent } from './components/pricing/pricing';
import { FaqComponent } from './components/faq/faq';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HeroComponent, ServicesComponent, GalleryComponent, PricingComponent, LocationComponent, FaqComponent, FooterComponent],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPageComponent { }