import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';

const CHAVE_TOKEN = 'sistemarh_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly _token = signal<string | null>(this.recuperarToken());

  readonly token = this._token.asReadonly();
  readonly estaLogado = computed(() => !!this._token());

  login(dados: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, dados)
      .pipe(tap((resposta) => this.salvarToken(resposta.token)));
  }

  logout(): void {
    this._token.set(null);
    sessionStorage.removeItem(CHAVE_TOKEN);
    localStorage.removeItem(CHAVE_TOKEN);
    document.cookie = `${CHAVE_TOKEN}=; path=/; max-age=0`;
    this.router.navigate(['/login']);
  }

  private salvarToken(token: string): void {
    this._token.set(token);
    this.salvarNoSessionStorage(token);
    this.salvarNoLocalStorage(token);
    this.salvarNoCookie(token);
  }

  private salvarNoSessionStorage(token: string): void {
    sessionStorage.setItem(CHAVE_TOKEN, token);
  }

  private salvarNoLocalStorage(token: string): void {
    localStorage.setItem(CHAVE_TOKEN, token);
  }

  private salvarNoCookie(token: string): void {
    const umaHora = 60 * 60;

    document.cookie =
      `${CHAVE_TOKEN}=${encodeURIComponent(token)}; path=/; max-age=${umaHora}; SameSite=Strict`;
  }

  private recuperarToken(): string | null {
    return (
      sessionStorage.getItem(CHAVE_TOKEN) ??
      localStorage.getItem(CHAVE_TOKEN) ??
      this.lerCookie(CHAVE_TOKEN)
    );
  }

  private lerCookie(nome: string): string | null {
    const item = document.cookie
      .split('; ')
      .find((c) => c.startsWith(`${nome}=`));

    return item ? decodeURIComponent(item.substring(nome.length + 1)) : null;
  }
}