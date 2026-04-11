import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-profile-screen',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './profile-screen.html',
  styleUrl: './profile-screen.scss'
})
export class ProfileScreenComponent implements OnInit {
  public profileForm: FormGroup;

  // Datos simulados del usuario de la BUAP
  public usuario = {
    nombre: 'Alexs IT',
    correo: 'alexs.it@buap.mx',
    rol: 'Administrador',
    fechaIngreso: new Date('2025-10-15'),
    foto: null // Aquí iría una URL de imagen
  };

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      correo: [this.usuario.correo, [Validators.required, Validators.email]],
      passwordActual: ['', Validators.required],
      nuevaPassword: ['', [Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  public guardarCambios() {
    if (this.profileForm.valid) {
      console.log('Actualizando perfil...', this.profileForm.value);
      alert('Perfil actualizado correctamente');
    }
  }
}
