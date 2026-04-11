import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-dashboard-screen',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './dashboard-screen.html',
  styleUrl: './dashboard-screen.scss'
})
export class DashboardScreenComponent implements OnInit {

  // Simulador de Rol: cámbialo a 'vendedor' para probar la otra vista
  public rolUsuario: string = 'admin';

  // Datos para el Administrador
  public adminStats = [
    { label: 'Ventas Totales', value: '$45,200', icon: 'payments', color: 'bg-primary' },
    { label: 'Productos', value: '1,250', icon: 'inventory_2', color: 'bg-success' },
    { label: 'Alertas Stock', value: '8', icon: 'warning', color: 'bg-danger' },
    { label: 'Vendedores', value: '4', icon: 'badge', color: 'bg-info' }
  ];

  // Datos para el Vendedor
  public vendedorStats = [
    { label: 'Mis Ventas Hoy', value: '$3,150', icon: 'shopping_basket', color: 'bg-success' },
    { label: 'Tickets Emitidos', value: '14', icon: 'confirmation_number', color: 'bg-primary' },
    { label: 'Faltantes Stock', value: '2', icon: 'history_edu', color: 'bg-warning' }
  ];

  constructor() {}

  ngOnInit(): void {}
}
