import { TestBed } from '@angular/core/testing';
import { ReservasService } from './reservas.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { ReservationViewModel } from '../models/reservation-View.Model';
import { RoomStatusDto } from '../models/room-status-dto';

describe('ReservasService', () => {
  let service: ReservasService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // <-- necessário para mockar o HttpClient
      providers: [ReservasService],
    });

    service = TestBed.inject(ReservasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // garante que não há requisições pendentes
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('Deve selecionar todos', () => {
    const mockData: ReservationViewModel[] = [{ id: '1' } as any];

    service.selecionarTodos().subscribe((result) => {
      expect(result).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/reservations`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('Deve selecionar todos com status', () => {
    const mockData: RoomStatusDto[] = [{ roomId: '1' } as any];

    service.selecionarTodosComStatus().subscribe((result) => {
      expect(result).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/reservations/rooms`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('Deve selecionar por ID', () => {
    const reserva = { id: '10', name: 'Reserva Teste' } as any;

    service.selecionarPorId(reserva.id).subscribe((result) => {
      expect(result).toEqual(reserva);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/reservations/${reserva.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(reserva);
  });

  it('Deve criar', () => {
    const reserva = { id: '10', name: 'Reserva Teste' } as any;

    service.criar(reserva).subscribe((result) => {
      expect(result).toEqual(reserva);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/reservations`);
    expect(req.request.method).toBe('POST');
    req.flush(reserva);
  });

  it('Deve editar', () => {
    const reserva = { id: '10', name: 'Reserva Teste' } as any;

    service.editar(reserva.id, reserva).subscribe((result) => {
      expect(result).toEqual(reserva);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/reservations/${reserva.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(reserva);
  });

  it('Deve excluir', () => {
    const reservaId = '10';

    service.excluir(reservaId).subscribe((result) => {
      expect(result).toEqual(true);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/reservations/${reservaId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(true);
  });

});
