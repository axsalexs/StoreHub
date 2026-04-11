import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-products-form-screen',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './products-form-screen.html',
  styleUrl: './products-form-screen.scss'
})
export class ProductsFormScreenComponent implements OnInit {
  public productoForm: FormGroup;
  public categorias = ['Bebidas', 'Snacks', 'Lácteos', 'Limpieza', 'Otros'];

  constructor(private fb: FormBuilder, private router: Router) {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      categoria: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(0.1)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      descripcion: ['', [Validators.maxLength(200)]]
    });
  }

  ngOnInit(): void {}

  public guardarProducto() {
    if (this.productoForm.valid) {
      console.log('Producto listo para enviar al Backend:', this.productoForm.value);
      // Aquí simulamos éxito y regresamos a la lista
      this.router.navigate(['/productos-screen']);
    } else {
      this.productoForm.markAllAsTouched();
    }
  }

  public cancelar() {
    this.router.navigate(['/productos-screen']);
  }
}
