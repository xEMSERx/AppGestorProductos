import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) { // 1. Si no está autenticado, vuelve al login
    router.navigate(['/login']);
    return false;
  }

  const isRestrictedRoute = state.url.includes('/new') || state.url.includes('/edit'); // 2. Si intenta entrar a crear o editar y NO es admin, lo regresa al listado
  if (isRestrictedRoute && !authService.isAdmin()) {
    router.navigate(['/products']);
    return false;
  }

  return true; // 3. En cualquier otro caso, tiene permiso
};