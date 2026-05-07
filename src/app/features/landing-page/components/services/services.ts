import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .services-section { background-color: #121212; padding: 80px 20px; color: #fff; font-family: 'Segoe UI', sans-serif; }
    .container { max-width: 1200px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 60px; }
    .title { color: #72b146; font-size: 2.5em; margin-bottom: 15px; letter-spacing: -1px; }
    .subtitle { color: #aaa; font-size: 1.1em; max-width: 600px; margin: 0 auto; line-height: 1.5; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; }
    .card { background-color: #1e1e1e; padding: 30px; border-radius: 12px; border: 1px solid #333; transition: transform 0.3s ease, border-color 0.3s ease; }
    .card:hover { transform: translateY(-5px); border-color: #72b146; }
    .icon { margin-bottom: 15px; }
    .card h3 { font-size: 1.4em; margin-bottom: 15px; color: #fff; }
    .card p { color: #888; line-height: 1.6; margin: 0; }

    /* MÁGICA DA RESPONSIVIDADE PARA CELULAR */
    @media (max-width: 768px) {
      .services-section { padding: 40px 15px; }
      .header { margin-bottom: 40px; }
      .title { font-size: 2em; text-align: center; }
      .grid { grid-template-columns: 1fr; gap: 20px; }
      .card { padding: 25px 20px; text-align: center; }
      .icon { display: flex; justify-content: center; }
    }
  `],
  template: `
    <section class="services-section">
      <div class="container">
        <div class="header">
          <h2 class="title">Muito Além do Treino Livre</h2>
          <p class="subtitle">Infraestrutura premium e a maior grade de aulas coletivas da região para você alcançar seus resultados sem cair na rotina.</p>
        </div>
        <div class="grid">
          <div class="card">
            <div class="icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#72b146" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            </div>
            <h3>Aulas Coletivas Premium</h3>
            <p>Pilates, Spinning, Dança (Ritmos), Circuito, Jump e Step. Grade completa com turmas exclusivas a partir das <strong>06:45</strong> da manhã.</p>
          </div>
          <div class="card">
            <div class="icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#72b146" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5h11"></path><path d="M6.5 17.5h11"></path><rect x="4" y="2" width="4" height="20" rx="1"></rect><rect x="16" y="2" width="4" height="20" rx="1"></rect><path d="M8 12h8"></path></svg>
            </div>
            <h3>Maquinário de Ponta</h3>
            <p>Equipamentos novos, limpos e organizados. Ampla linha de Cardio e foco especial em aparelhos para <strong>Membros Inferiores (MMII)</strong>.</p>
          </div>
          <div class="card">
            <div class="icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#72b146" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><path d="M9 16V8h4a2 2 0 0 1 0 4H9"></path></svg>
            </div>
            <h3>Comodidade e Segurança</h3>
            <p>Treine sem estresse. Contamos com estacionamento próprio com amplas vagas na fachada e acesso ao nosso <strong>subsolo exclusivo</strong>.</p>
          </div>
          <div class="card">
            <div class="icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#72b146" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <h3>Horário Flexível</h3>
            <p>A sua rotina não tem limites. Além da semana, abrimos em horários especiais aos <strong>sábados e domingos</strong> para você não faltar.</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ServicesComponent {}