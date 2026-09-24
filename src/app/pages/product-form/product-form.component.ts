import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

import { MatInputModule } from '@angular/material/input'; // Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { ProductService } from '../../services/product.service'; // Nuestros servicios
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEdit = false; // Bandera para saber si estamos creando o editando
  productId: string | null = null;

  private fb = inject(FormBuilder); // Inyecciones (Angular 17+)
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.productForm = this.fb.group({ // 1. Inicializamos el formulario con sus validaciones
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });

    this.productId = this.route.snapshot.paramMap.get('id'); // 2. Revisamos si la URL trae un ID (ej: /products/edit/1)
    if (this.productId) {
      this.isEdit = true;
      this.productService.getProductById(this.productId).subscribe({ // Si estamos editando, pedimos los datos a MockAPI y los cargamos en el formulario
        next: (product) => {
          this.productForm.patchValue(product);
        },
        error: (err) => console.error('Error al cargar el producto', err)
      });
    }
  }

  saveProduct(): void {
    if (this.productForm.invalid) return;

    const productData: Product = this.productForm.value; // Extraemos los valores de las cajas de texto

    if (this.isEdit && this.productId) {
      this.productService.updateProduct(this.productId, productData).subscribe({ // ACTUALIZAR (Update)
        next: () => this.router.navigate(['/products']),
        error: (err) => console.error('Error al actualizar', err)
      });
    } else {
      this.productService.addProduct(productData).subscribe({ // CREAR (Create)
        next: () => this.router.navigate(['/products']),
        error: (err) => console.error('Error al crear', err)
      });
    }
  }
}