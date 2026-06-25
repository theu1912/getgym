import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Guarda de rota para o painel admin.
 * Verifica se o token de admin está salvo no sessionStorage.
 * O token é gravado pelo AdminLayoutComponent após o login.
 */
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = sessionStorage.getItem('admin_token');

  if (token) {
    return true;
  }

  // Redireciona para a tela de login do admin
  router.navigate(['/admin/login']);
  return false;
};
