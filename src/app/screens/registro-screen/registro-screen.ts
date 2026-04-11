import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-registro-screen',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './registro-screen.html',
  styleUrl: './registro-screen.scss'
})
export class RegistroScreenComponent {
  public registroForm: FormGroup;
  public hidePassword = true;
  public roles = [
    { value: 'admin', viewValue: 'Administrador' },
    { value: 'Cajero/vendedor', viewValue: 'Cajero/Vendedor' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      rol: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
  }

  public onRegister(): void {
    if (this.registroForm.valid) {
      this.router.navigate(['/login-screen']);
    } else {
      this.registroForm.markAllAsTouched();
    }
  }
}
