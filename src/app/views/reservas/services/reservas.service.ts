import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReservationViewModel } from '../models/reservation-View.Model';
import { RoomStatusDto } from '../models/room-status-dto';

const RESERVATIONS_KEY = 'reservations';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private API_URL = `${environment.API_URL}/reservations`;

  constructor(private http: HttpClient) { }

  criar(reservation: ReservationViewModel): Observable<ReservationViewModel> {
    return this.http.post<ReservationViewModel>(this.API_URL, reservation);
  }

  editar(id: string, newReservation: ReservationViewModel): Observable<ReservationViewModel | undefined> {
    const url = `${this.API_URL}/${id}`;
    return this.http.put<ReservationViewModel>(url, newReservation);
  }

  excluir(id: string): Observable<boolean> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<boolean>(url);
  }

  selecionarPorId(id: string): Observable<ReservationViewModel | undefined> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<any>(url);
  }

  selecionarTodos(): Observable<ReservationViewModel[]> {
    return this.http.get<any>(this.API_URL);
  }

  selecionarTodosComStatus(): Observable<RoomStatusDto[]> {
    const url = `${this.API_URL}/rooms`;
    return this.http.get<any>(url);
    // const quartos: { descricao: string, status: string, periodoReserva: string, hospede: string }[] = [
    //       {
    //         descricao: 'Quarto 1',
    //         status: 'Ocupado',
    //         periodoReserva: '01/01/2025 - 05/01/2025',
    //         hospede: 'Leandro'
    //       },
    //       {
    //         descricao: 'Quarto 1',
    //         status: 'Disponível',
    //         periodoReserva: '01/01/2025 - 05/01/2025',
    //         hospede: 'Leandro'
    //       },
    //       {
    //         descricao: 'Quarto 1',
    //         status: 'Ocupado',
    //         periodoReserva: '01/01/2025 - 05/01/2025',
    //         hospede: 'Leandro'
    //       },
    //       {
    //         descricao: 'Quarto 1',
    //         status: 'Disponível',
    //         periodoReserva: '01/01/2025 - 05/01/2025',
    //         hospede: 'Leandro'
    //       },
    //       {
    //         descricao: 'Quarto 1',
    //         status: 'Ocupado',
    //         periodoReserva: '01/01/2025 - 05/01/2025',
    //         hospede: 'Leandro'
    //       },
    //       {
    //         descricao: 'Quarto 1',
    //         status: 'Disponível',
    //         periodoReserva: '01/01/2025 - 05/01/2025',
    //         hospede: 'Leandro'
    //       },
    //       {
    //         descricao: 'Quarto 1',
    //         status: 'Ocupado',
    //         periodoReserva: '01/01/2025 - 05/01/2025',
    //         hospede: 'Leandro'
    //       },
    //       {
    //         descricao: 'Quarto 1',
    //         status: 'Disponível',
    //         periodoReserva: '01/01/2025 - 05/01/2025',
    //         hospede: 'Leandro'
    //       },
    //       {
    //         descricao: 'Quarto 1',
    //         status: 'Ocupado',
    //         periodoReserva: '01/01/2025 - 05/01/2025',
    //         hospede: 'Leandro'
    //       },
    //       {
    //         descricao: 'Quarto 1',
    //         status: 'Disponível',
    //         periodoReserva: '01/01/2025 - 05/01/2025',
    //         hospede: 'Leandro'
    //       },
    //       {
    //         descricao: 'Quarto 1',
    //         status: 'Ocupado',
    //         periodoReserva: '01/01/2025 - 05/01/2025',
    //         hospede: 'Leandro'
    //       },
    //       {
    //         descricao: 'Quarto 1',
    //         status: 'Disponível',
    //         periodoReserva: '01/01/2025 - 05/01/2025',
    //         hospede: 'Leandro'
    //       },
    //       {
    //         descricao: 'Quarto 1',
    //         status: 'Ocupado',
    //         periodoReserva: '01/01/2025 - 05/01/2025',
    //         hospede: 'Leandro'
    //       },
    //       {
    //         descricao: 'Quarto 1',
    //         status: 'Disponível',
    //         periodoReserva: '01/01/2025 - 05/01/2025',
    //         hospede: 'Leandro'
    //       },
    //     ]
    //     return of(quartos);
  }

}
