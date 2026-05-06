import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-units-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './units-grid.html',
  styleUrl: './units-grid.scss'
})
export class UnitsGridComponent {
  // Lista organizada com os dados reais para resolver o bug do WordPress
  gymUnits = [
    {
      name: 'Unidade 1: Getgym Piraquara',
      address: 'Av. Getúlio Vargas, 767 – Centro. Piraquara – PR',
      hours: 'Seg a Sex: 6h às 23h | Sáb: 8h às 16h',
      phone: '(41) 98449-6767',
      whatsappLink: 'https://wa.me/5541984496767?text=Vim%20pelo%20site%20e%20quero%20treinar%20na%20Getgym!'
    },
    {
      name: 'Unidade 2: Getgym Pinhais',
      address: 'Av. Iraí, 440 – Weissópolis. Pinhais – PR',
      hours: 'Seg a Sex: 6h às 23h | Sáb: 8h às 16h',
      phone: '(41) 99999-9999', // Ajustar quando tiver o número real
      whatsappLink: 'https://wa.me/5541999999999'
    }
  ];
}