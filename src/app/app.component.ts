import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestor-productos';

  public authService = inject(AuthService); // Hacemos público el authService para poder usarlo en el HTML
  private router = inject(Router);

  logout(): void {
    this.authService.logout(); // Borra el token del localStorage
    this.router.navigate(['/login']); // Te patea al login
  }
}