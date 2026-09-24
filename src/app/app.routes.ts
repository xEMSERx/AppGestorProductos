import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductFormComponent } from './pages/product-form/product-form.component'; // Importamos el formulario

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' }, // Cuando la URL no tenga nada extra (localhost:4200), redirige a la lista
    { path: 'products', component: ProductListComponent }, // Cuando la URL sea /products, muestra el componente ProductListComponent
    { path: 'products/new', component: ProductFormComponent }, // Ruta para crear
    { path: 'products/edit/:id', component: ProductFormComponent } // Ruta para editar (lleva un parámetro de ID)
];