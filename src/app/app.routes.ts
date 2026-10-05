import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' }, // 1. Por defecto, intentamos ir a productos
    { path: 'login', component: LoginComponent }, // 2. Ruta PÚBLICA (El Login)
    {// 3. Rutas PROTEGIDAS con Lazy Loading (loadComponent)
        path: 'products',
        canActivate: [authGuard], // <-- El Guardia revisa si estás logueado
        // Lazy Loading: Solo descarga este código si el guardia te deja pasar
        loadComponent: () => import('./pages/product-list/product-list.component').then(m => m.ProductListComponent)
    },
    {
        path: 'products/new',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/product-form/product-form.component').then(m => m.ProductFormComponent)
    },
    {
        path: 'products/edit/:id',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/product-form/product-form.component').then(m => m.ProductFormComponent)
    }
];