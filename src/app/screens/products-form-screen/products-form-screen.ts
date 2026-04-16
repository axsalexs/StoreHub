import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-products-form-screen',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './products-form-screen.html',
  styleUrl: './products-form-screen.scss'
})

  export class ProductsFormScreenComponent implements OnInit {

  public productoForm: FormGroup;
  public categorias = ['Bebidas', 'Snacks', 'Lácteos', 'Limpieza', 'Otros'];

  constructor(private fb: FormBuilder, private router: Router) {
    this.productoForm = this.fb.group({
      // Nombre: Agregué el validador de patrón para evitar espacios vacíos al inicio/final
      nombre: ['', [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/)
      ]],
      categoria: ['', [Validators.required]],
      // Precio: Ahora lo manejaremos como string inicialmente para la máscara
      precio: ['', [Validators.required, Validators.min(0.1), Validators.max(999.99)]],
      stock: ['', [Validators.required, Validators.pattern(/^[0-9]{1,3}$/)]],
      descripcion: ['', [Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {}

  public validarNombre(event: any) {
    const input = event.target as HTMLInputElement;
    let valor = input.value;

    // 1. Solo permite letras (borra números y símbolos instantáneamente)
    valor = valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, '');

    // 2. No permite espacios al inicio
    if (valor.startsWith(' ')) {
      valor = valor.trim();
    }

    // 3. No permite más de un espacio seguido
    valor = valor.replace(/\s{2,}/g, ' ');

    // 4. Limita a 30 caracteres
    if (valor.length > 30) {
      valor = valor.substring(0, 30);
    }

    // Actualizamos el valor en el formulario y en el input físico
    input.value = valor;
    this.productoForm.get('nombre')?.setValue(valor);
  }

  // Lógica para el punto automático en el precio
  public formatearPrecio(event: any) {
    let valor = event.target.value.replace(/\D/g, ''); // Solo números
    if (valor.length > 5) valor = valor.substring(0, 5); // Máximo 999.99 (5 dígitos)

    if (valor.length > 2) {
      const enteros = valor.substring(0, valor.length - 2);
      const decimales = valor.substring(valor.length - 2);
      valor = `${enteros}.${decimales}`;
    }

    this.productoForm.get('precio')?.setValue(valor, { emitEvent: false });
  }

  // Lógica para limpiar espacios dobles o vacíos en el nombre
  public validarEspacios(event: any) {
    const input = event.target as HTMLInputElement;
    // No permite espacio al inicio y limita a 30 caracteres físicamente
    if (input.value.startsWith(' ')) {
      input.value = input.value.trim();
    }
    if (input.value.length > 30) {
      input.value = input.value.substring(0, 30);
    }
    this.productoForm.get('nombre')?.setValue(input.value);
  }

  public validarStock(event: any) {
  const input = event.target as HTMLInputElement;
  // Borra instantáneamente cualquier cosa que NO sea un número
  let valor = input.value.replace(/[^0-9]/g, '');

  // Limita físicamente a 3 díditos (máx 999)
  if (valor.length > 3) {
    valor = valor.substring(0, 3);
  }

  input.value = valor;
  this.productoForm.get('stock')?.setValue(valor);
}

  public guardarProducto() {
    if (this.productoForm.valid) {
      console.log('Producto guardado:', this.productoForm.value);
      this.router.navigate(['/productos-screen']);
    } else {
      this.productoForm.markAllAsTouched();
    }
  }

  public cancelar() {
    this.router.navigate(['/productos-screen']);
  }
}
