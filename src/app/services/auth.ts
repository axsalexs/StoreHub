import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'; 

  constructor(private http: HttpClient) { }

  registrar(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro/`, userData);
  }

  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/token/`, credenciales);
  }

  guardarToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  obtenerToken() {
    return localStorage.getItem('access_token');
  }
}