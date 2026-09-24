import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dolarapi.com/v1/dolares/blue'; // DolarAPI no cambia, es una URL externa

  constructor() { }

  getExchangeRate(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}