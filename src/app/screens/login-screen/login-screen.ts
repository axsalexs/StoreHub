import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.scss'
})
export class LoginScreenComponent {
  public loginForm: FormGroup;
  public hidePassword = true; 

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService 
  ) {
    this.loginForm = this.fb.group({
      // Regex para forzar @ y punto en el correo
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
  }

  public onLogin(): void {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;

      const credenciales = {
        username: formValues.email.split('@')[0], 
        password: formValues.password
      };

      this.authService.login(credenciales).subscribe({
        next: (respuesta) => {
          console.log('¡Login exitoso!', respuesta);
          
          this.authService.guardarToken(respuesta.access);

          localStorage.setItem('username', credenciales.username);
          
          this.router.navigate(['/dashboard-screen']);
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);
          alert('Credenciales incorrectas. Verifica tu correo y contraseña.');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}