import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuartosService } from '../quartos/services/quartos.service';
import { RoomsViewModel } from '../quartos/models/rooms-View.Model';
import { ReservasService } from '../reservas/services/reservas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard,component.scss']
})
export class DashboardComponent implements OnInit {

  protected quartos: { descricao: string, status: string, periodoReserva: string, hospede: string }[] = [];

  constructor(
    private router: Router,
    private readonly reservaService: ReservasService
  ) {}

  ngOnInit(): void {
    this.reservaService.selecionarTodosComStatus()
    .subscribe({
      next: (quartos) => {
        console.log(quartos)
        this.quartos = quartos;
      }
    })
  }

  protected toGuests() {
    this.navigate('/hospedes', 'listar');
  }

  protected toFinanceiro() {
    this.navigate('/financeiro', 'listar');
  }

  protected toRooms() {
    this.navigate('/quartos', 'listar');
  }

  protected toReservations() {
    this.navigate('/reservas', 'listar');
  }

  protected toReports() {
    this.navigate('/relatorios', 'listar');
  }

  protected navigate(path: string, subPath: string) {
    this.router.navigate([path, subPath]);
  }

}
