import { Component, OnInit } from '@angular/core';

import { forkJoin } from 'rxjs';

import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { FinancialViewModel } from 'src/app/views/financeiro/models/financial-View.Model';
import { FinanceiroService } from 'src/app/views/financeiro/services/financeiro.service';
import { GuestViewModel } from 'src/app/views/hospedes/models/guest-View.Model';
import { HospedesService } from 'src/app/views/hospedes/services/hospedes.service';
import { RoomsViewModel } from 'src/app/views/quartos/models/rooms-View.Model';
import { QuartosService } from 'src/app/views/quartos/services/quartos.service';
import { ReservationViewModel } from 'src/app/views/reservas/models/reservation-View.Model';
import { ReservasService } from 'src/app/views/reservas/services/reservas.service';
import * as XLSX from 'xlsx';
import { HttpErrorResponse } from '@angular/common/http';
import { lerFalhaHttp } from 'src/app/core/utils/ler-falha-http';

interface Report {
  checkIn: string;
  checkOut: string;
  numberOfAdults: number;
  numberOfChildren: number;
  guestName: string;
  roomName: string;
  reservationValue: number;
  additionalValue: number;
  payment: string;
}

@Component({
  selector: 'app-listar-relatorio-reservas',
  templateUrl: './listar-relatorio-reservas.component.html',
  styleUrls: ['./listar-relatorio-reservas.component.scss']
})
export class ListarRelatorioReservasComponent implements OnInit {

  protected reservations: ReservationViewModel[] = [];
  private financeiros: FinancialViewModel[] = [];
  private rooms: RoomsViewModel[] = [];
  private guests: GuestViewModel[] = [];

  public dataInicial: Date | null = null;
  public dataFinal: Date | null = null;
  public reservasFiltradas: Report[] = [];

  constructor(
    private notification: NotificationService,
    private financeiroService: FinanceiroService,
    private reservasService: ReservasService,
    private hospedeService: HospedesService,
    private quartoService: QuartosService
  ) { }

  ngOnInit(): void {
    forkJoin([
      this.financeiroService.selecionarTodos(),
      this.reservasService.selecionarTodos(),
      this.hospedeService.selecionarTodos(),
      this.quartoService.selecionarTodos(),
    ])
      .subscribe({
        next: ([financeiro, reservations, guests, rooms]) => {
          this.financeiros = financeiro;
          this.reservations = reservations;
          this.guests = guests;
          this.rooms = rooms;
          this.prepareData(reservations);
        },
        error: (error) => this.processarFalha(error)
      });
  }

  public filtrarPorPeriodo(): void {
    if (this.dataInicial && this.dataFinal) {
      const inicio = moment(this.dataInicial);
      const fim = moment(this.dataFinal);
      const reservasFiltradas = this.reservations.filter(reserva => {
        const checkIn = new Date(reserva.checkIn);
        return inicio.isSameOrBefore(checkIn) && fim.isSameOrAfter(checkIn);
      });
      this.prepareData(reservasFiltradas);
    } else {
      this.prepareData(this.reservations);
    }
  }

  public gerarPDF(): void {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [[
        'DATA ENTRADA',
        'DATA SAÍDA',
        'Nº CRIANÇAS',
        'Nº ADULTOS',
        'QUARTO',
        'HÓSPEDE',
        'VALOR RESERVA',
        'VALORES ADICIONAIS',
        'PAGAMENTO'
      ]],
      body: this.reservasFiltradas.map(reserva => [
        reserva.checkIn,
        reserva.checkOut,
        reserva.numberOfChildren,
        reserva.numberOfAdults,
        reserva.roomName,
        reserva.guestName,
        reserva.reservationValue,
        reserva.additionalValue,
        reserva.payment
      ])
    });
    doc.save('relatorio-reservas.pdf');
  }

  public gerarExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(
      this.reservasFiltradas.map(reserva => ({
        'DATA ENTRADA': reserva.checkIn,
        'DATA SAÍDA': reserva.checkOut,
        'Nº CRIANÇAS': reserva.numberOfChildren,
        'Nº ADULTOS': reserva.numberOfAdults,
        'QUARTO': reserva.roomName,
        'HÓSPEDE': reserva.guestName,
        'VALOR RESERVA': reserva.reservationValue,
        'VALORES ADICIONAIS': reserva.additionalValue,
        'PAGAMENTO': reserva.payment
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatórios');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'relatorio-reservas.xlsx');
  }

  private prepareData(reservations: ReservationViewModel[]) {
    this.reservasFiltradas = reservations.map(reserva => {
      let reservationValue = 0;
      let payment = '';
      let additionalValue = 0;
      const financial = this.financeiros.find(f => f.id === reserva.id);
      if (financial) {
        reservationValue = financial.reservationValue;
        additionalValue = financial.additionalValue;
        payment = financial.payment;
      }
      const report: Report = {
        checkIn: moment(reserva.checkIn).format('DD/MM/YYYY'),
        checkOut: moment(reserva.checkOut).format('DD/MM/YYYY'),
        numberOfAdults: reserva.numberOfAdults,
        numberOfChildren: reserva.numberOfChildren,
        reservationValue: reservationValue,
        additionalValue: additionalValue,
        payment: payment,
        guestName: this.buscaNomeHospede(reserva.guestId),
        roomName: this.buscaDescricaoQuarto(reserva.roomId)
      }
      return report;
    });
  }

  protected buscaDescricaoQuarto(id: string): string {
    let descricao: string = '';
    const room: RoomsViewModel | undefined = this.rooms.find(room => room.id === id);
    if (room) {
      descricao = room.description;
    } else {
      console.error(`Quarto não encontrado: ${id}`);
      descricao = 'Quarto não encontrado';
    }
    return descricao;
  }

  protected buscaNomeHospede(id: string): string {
    let descricao: string = '';
    const guest: GuestViewModel | undefined = this.guests.find(item => item.id === id);
    if (guest) {
      descricao = guest.name;
    } else {
      console.error(`Hóspede não encontrado: ${id}`);
      descricao = 'Hóspede não encontrado';
    }
    return descricao;
  }



  private processarFalha(err: HttpErrorResponse) {
    console.log(err);
    this.notification.erro(lerFalhaHttp(err));
  }
}
