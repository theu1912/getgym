import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  styles: [`
    .lock-screen { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #f5f6fa; font-family: 'Segoe UI', sans-serif; }
    .lock-card { background: #fff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; width: 350px; }
    .lock-input { width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px; text-align: center; letter-spacing: 5px; font-size: 1.2em;}
    .btn-unlock { background-color: #2d3436; color: #fff; border: none; padding: 12px; width: 100%; border-radius: 4px; cursor: pointer; font-weight: bold; }
  `],
  template: `
    <div class="lock-screen">
      <div class="lock-card">
        <h2 style="margin-bottom: 20px; color: #333;">Acesso Restrito</h2>
        <input type="password" class="lock-input" [(ngModel)]="pinInput" placeholder="PIN" maxlength="6" (keyup.enter)="unlock()">
        <div *ngIf="errorMessage" style="color: #ef4444; margin-bottom: 15px; font-size: 0.9em;">{{ errorMessage }}</div>
        <button class="btn-unlock" (click)="unlock()">Desbloquear Cofre</button>
      </div>
    </div>
  `
})
export class LoginComponent {
  pinInput = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  unlock() {
    this.http.post<any>(`${environment.apiUrl}/auth/financeiro`, { pin: this.pinInput })
      .subscribe({
        next: (response) => {
          // Guarda o crachá
          localStorage.setItem('token', response.token);
          
          // Libera a catraca e manda para o painel!
          this.router.navigate(['/financeiro']);
        },
        error: (err) => {
          this.errorMessage = 'Acesso negado pelo servidor. PIN incorreto.';
          this.pinInput = '';
        }
      });
  }
}