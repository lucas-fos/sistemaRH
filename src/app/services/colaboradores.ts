import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Colaborador } from '../models/colaborador';

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresService {

  private readonly http = inject(HttpClient);

  listar(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(
      `${environment.apiUrl}/usuarios`
    );
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiUrl}/usuarios/${id}`
    );
  }

}