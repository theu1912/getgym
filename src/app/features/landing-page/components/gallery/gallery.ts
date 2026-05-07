import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .gallery-section { background-color: #1a1a1a; padding: 80px 20px; color: #fff; font-family: 'Segoe UI', sans-serif; }
    .container { max-width: 1200px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 50px; }
    .title { color: #72b146; font-size: 2.5em; margin-bottom: 15px; letter-spacing: -1px; }
    .subtitle { color: #aaa; font-size: 1.1em; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
    .photo-card { border-radius: 12px; overflow: hidden; height: 280px; position: relative; border: 1px solid #333; background-color: #111; }
    .photo-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
    .photo-card:hover img { transform: scale(1.1); }
    .photo-label { position: absolute; bottom: 0; left: 0; width: 100%; background: linear-gradient(transparent, rgba(0,0,0,0.9)); padding: 25px 15px 10px; color: #fff; font-weight: bold; font-size: 1.1em; box-sizing: border-box; }
    
    @media (max-width: 768px) {
      .gallery-section { padding: 40px 15px; }
      .title { font-size: 2em; }
      .photo-card { height: 220px; }
    }
  `],
  template: `
    <section class="gallery-section">
      <div class="container">
        <div class="header">
          <h2 class="title">Nossa Estrutura Real</h2>
          <p class="subtitle">Veja por que a Getgym é a escolha favorita em Curitiba e região.</p>
        </div>
        <div class="grid">
          
          <div class="photo-card">
            <img src="assets/foto-geral.png" alt="Estrutura Geral Getgym">
            <div class="photo-label">Infraestrutura Ampla</div>
          </div>

          <div class="photo-card">
            <img src="assets/foto-pesos.png" alt="Área de Musculação">
            <div class="photo-label">Maquinário de Ponta</div>
          </div>

          <div class="photo-card">
            <img src="assets/foto-spinning.png" alt="Sala de Spinning Getgym">
            <div class="photo-label">Aulas Coletivas Premium</div>
          </div>

          <div class="photo-card">
            <img src="assets/foto-sala.png" alt="Sala de Funcional e Alongamento">
            <div class="photo-label">Salas Climatizadas e Equipadas</div>
          </div>

        </div>
      </div>
    </section>
  `
})
export class GalleryComponent {}