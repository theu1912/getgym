import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .location-section { background-color: #121212; padding: 80px 20px; color: #fff; font-family: 'Segoe UI', sans-serif; border-top: 1px solid #222; }
    .container { max-width: 1000px; margin: 0 auto; text-align: center; }
    .title { color: #72b146; font-size: 2.5em; margin-bottom: 20px; letter-spacing: -1px; }
    .btn-group { display: flex; justify-content: center; gap: 15px; margin-bottom: 30px; flex-wrap: wrap; }
    .btn-unit { background-color: #1e1e1e; color: #aaa; border: 2px solid #333; padding: 12px 25px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.3s; font-size: 1em; }
    .btn-unit.active { background-color: #72b146; color: #fff; border-color: #72b146; }
    .btn-unit:hover:not(.active) { border-color: #555; color: #fff; }
    .map-container { border-radius: 12px; overflow: hidden; border: 1px solid #333; height: 400px; width: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    iframe { width: 100%; height: 100%; border: none; }
    
    @media (max-width: 768px) {
      .location-section { padding: 40px 15px; }
      .title { font-size: 2em; }
      .btn-unit { width: 100%; }
      .map-container { height: 300px; }
    }
  `],
  template: `
    <section class="location-section">
      <div class="container">
        <h2 class="title">Onde Estamos</h2>
        <p style="color: #aaa; margin-bottom: 30px; font-size: 1.1em;">Selecione a unidade mais próxima de você.</p>
        
        <div class="btn-group">
          <button class="btn-unit" [class.active]="unidadeSelecionada === 'Fazendinha'" (click)="mudarUnidade('Fazendinha')">Fazendinha (Matriz)</button>
          <button class="btn-unit" [class.active]="unidadeSelecionada === 'Piraquara'" (click)="mudarUnidade('Piraquara')">Piraquara</button>
          <button class="btn-unit" [class.active]="unidadeSelecionada === 'Pinhais'" (click)="mudarUnidade('Pinhais')">Pinhais</button>
        </div>

        <div class="map-container">
          <iframe *ngIf="unidadeSelecionada === 'Fazendinha'" 
                  src="https://maps.google.com/maps?q=R.+Jo%C3%A3o+Dembinski,+3389+-+Fazendinha,+Curitiba+-+PR&t=m&z=15&output=embed&iwloc=near" 
                  title="Getgym Fazendinha" loading="lazy">
          </iframe>
          
          <iframe *ngIf="unidadeSelecionada === 'Piraquara'" 
                  src="https://maps.google.com/maps?q=Av.+Get%C3%BAlio+Vargas,+767+-+Centro,+Piraquara+-+PR&t=m&z=15&output=embed&iwloc=near" 
                  title="Getgym Piraquara" loading="lazy">
          </iframe>
          
          <iframe *ngIf="unidadeSelecionada === 'Pinhais'" 
                  src="https://maps.google.com/maps?q=Av.+Ira%C3%AD,+440+-+Weiss%C3%B3polis,+Pinhais+-+PR&t=m&z=15&output=embed&iwloc=near" 
                  title="Getgym Pinhais" loading="lazy">
          </iframe>
        </div>
      </div>
    </section>
  `
})
export class LocationComponent {
  unidadeSelecionada: string = 'Fazendinha';

  mudarUnidade(unidade: string) {
    this.unidadeSelecionada = unidade;
  }
}