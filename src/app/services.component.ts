import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section style="background-color: #121212; padding: 80px 20px; color: #fff; font-family: 'Segoe UI', sans-serif;">
      <div style="max-width: 1200px; margin: 0 auto;">
        
        <div style="text-align: center; margin-bottom: 60px;">
          <h2 style="color: #72b146; font-size: 2.5em; margin-bottom: 15px; letter-spacing: -1px;">Muito Além do Treino Livre</h2>
          <p style="color: #aaa; font-size: 1.1em; max-width: 600px; margin: 0 auto;">
            Infraestrutura premium e a maior grade de aulas coletivas da região para você alcançar seus resultados sem cair na rotina.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px;">
          
          <div style="background-color: #1e1e1e; padding: 30px; border-radius: 12px; border: 1px solid #333; transition: transform 0.3s ease, border-color 0.3s ease;" 
               onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#72b146'" 
               onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='#333'">
            <div style="font-size: 2.5em; margin-bottom: 15px;">🚴‍♀️</div>
            <h3 style="font-size: 1.4em; margin-bottom: 15px; color: #fff;">Aulas Coletivas Premium</h3>
            <p style="color: #888; line-height: 1.6;">
              Grade completa de aulas dinâmicas desde as 06:45 da manhã. Participe de turmas de <strong>Spinning, Dança (Ritmos), Pilates, Jump, Step e Circuito Funcional</strong>.
            </p>
          </div>

          <div style="background-color: #1e1e1e; padding: 30px; border-radius: 12px; border: 1px solid #333; transition: transform 0.3s ease, border-color 0.3s ease;"
               onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#72b146'" 
               onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='#333'">
            <div style="font-size: 2.5em; margin-bottom: 15px;">🏋️‍♂️</div>
            <h3 style="font-size: 1.4em; margin-bottom: 15px; color: #fff;">Maquinário de Ponta</h3>
            <p style="color: #888; line-height: 1.6;">
              Equipamentos novos, limpos e organizados. Ampla variedade de máquinas de Cardio e foco especial em equipamentos para Membros Inferiores (MMII).
            </p>
          </div>

          <div style="background-color: #1e1e1e; padding: 30px; border-radius: 12px; border: 1px solid #333; transition: transform 0.3s ease, border-color 0.3s ease;"
               onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#72b146'" 
               onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='#333'">
            <div style="font-size: 2.5em; margin-bottom: 15px;">🚗</div>
            <h3 style="font-size: 1.4em; margin-bottom: 15px; color: #fff;">Comodidade e Segurança</h3>
            <p style="color: #888; line-height: 1.6;">
              Treine sem preocupação com o seu veículo. Oferecemos <strong>estacionamento próprio</strong> com amplas vagas tanto na fachada quanto no nosso <strong>subsolo exclusivo</strong>.
            </p>
          </div>

          <div style="background-color: #1e1e1e; padding: 30px; border-radius: 12px; border: 1px solid #333; transition: transform 0.3s ease, border-color 0.3s ease;"
               onmouseover="this.style.transform='translateY(-5px)'; this.style.borderColor='#72b146'" 
               onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='#333'">
            <div style="font-size: 2.5em; margin-bottom: 15px;">⏰</div>
            <h3 style="font-size: 1.4em; margin-bottom: 15px; color: #fff;">Horário Flexível</h3>
            <p style="color: #888; line-height: 1.6;">
              Salas de atividades amplas, limpas e climatizadas. E o melhor: abrimos em horários especiais aos <strong>sábados e domingos</strong> para não quebrar a sua rotina.
            </p>
          </div>

        </div>
      </div>
    </section>
  `
})
export class ServicesComponent {}