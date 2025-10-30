import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReservationViewModel } from '../../reservas/models/reservation-View.Model';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  private API_URL = `${environment.API_URL}/reports`;

  constructor(private http: HttpClient) { }

  selecionarPorId(id: string): Observable<ReservationViewModel | undefined> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<any>(url);
  }

  selecionarTodos(): Observable<ReservationViewModel[]> {
    return this.http.get<any>(this.API_URL);
  }

}
