import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background: #1a1a1a; color: white; font-family: sans-serif; text-align: center; padding: 20px;">
      <div style="background: #2d2d2d; padding: 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); max-width: 400px;">
        <div style="font-size: 50px; color: #72b146; margin-bottom: 20px;">✓</div>
        <h1 style="margin-bottom: 10px;">Matrícula Realizada!</h1>
        <p style="color: #aaa; line-height: 1.6; margin-bottom: 30px;">
          Bem-vindo à família GetGym! Seu cadastro foi processado e você já pode comparecer à nossa unidade.
        </p>
        <button routerLink="/" style="background: #72b146; color: white; border: none; padding: 12px 25px; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%;">
          Voltar para o Início
        </button>
      </div>
    </div>
  `
})
export class ConfirmationComponent {}