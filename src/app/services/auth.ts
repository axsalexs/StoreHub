import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Esta es la URL de tu servidor en Python que probamos hace rato
  private apiUrl = 'http://127.0.0.1:8000/api'; 

  constructor(private http: HttpClient) { }

  registrar(userData: any): Observable<any> {
    // Hace la petición POST a tu endpoint de Django
    return this.http.post(`${this.apiUrl}/registro/`, userData);
  }
}