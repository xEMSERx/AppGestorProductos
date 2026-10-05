import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency',
  standalone: true
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number, currencyCode: string = 'ARS'): string { // Ahora recibe un parámetro opcional 'currencyCode' (por defecto será 'ARS')
    if (value == null) return '';

    const formattedNumber = new Intl.NumberFormat('es-AR', { // Formateamos el número para que tenga 2 decimales y puntos de mil
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);

    if (currencyCode === 'USD') { // Dependiendo de la moneda que le pidamos, cambia el símbolo
      return 'U$S' + formattedNumber;
    } else {
      return '$' + formattedNumber;
    }
  }
}