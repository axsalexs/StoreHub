import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-header-partial',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './header-partial.html',
  styleUrl: './header-partial.scss'
})
export class HeaderPartialComponent implements OnInit {
  public fechaActual: Date = new Date();
  public nombreUsuario: string = "Usuario"; 

  constructor() {}

  ngOnInit(): void {
    const valorGuardado = localStorage.getItem('username');
    
    if (valorGuardado) {
      this.nombreUsuario = valorGuardado.charAt(0).toUpperCase() + valorGuardado.slice(1);
    }

    setInterval(() => {
      this.fechaActual = new Date();
    }, 60000);
  }
}