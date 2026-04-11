import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-clients-form',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './clients-form-screen.html'
})
export class ClientsFormScreenComponent {
  public clientForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.clientForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.maxLength(100)]]
    });
  }

  public guardar() {
    if (this.clientForm.valid) {
      console.log('Cliente registrado:', this.clientForm.value);
      this.router.navigate(['/clients-list']);
    } else {
      this.clientForm.markAllAsTouched();
    }
  }
}
