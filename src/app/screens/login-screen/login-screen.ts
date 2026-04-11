import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.scss'
})
export class LoginScreenComponent {
  public loginForm: FormGroup;
  public hidePassword = true; // Controla la visibilidad de la contraseña

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      // Regex para forzar @ y punto en el correo
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
  }

  public onLogin(): void {
    if (this.loginForm.valid) {
      this.router.navigate(['/landing-screen']);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
