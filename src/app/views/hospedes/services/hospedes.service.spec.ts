import { TestBed } from '@angular/core/testing';
import { HospedesService } from './hospedes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { GuestViewModel } from '../models/guest-View.Model';

describe('HospedesService', () => {
  let service: HospedesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // <-- necessário para mockar o HttpClient
      providers: [HospedesService],
    });

    service = TestBed.inject(HospedesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // garante que não há requisições pendentes
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('Deve selecionar todos', () => {
    const mockData: GuestViewModel[] = [{ id: '1' } as any];

    service.selecionarTodos().subscribe((result) => {
      expect(result).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/guests`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('Deve selecionar por ID', () => {
    const hospede = { id: '10', name: 'Hóspede Teste' } as any;

    service.selecionarPorId(hospede.id).subscribe((result) => {
      expect(result).toEqual(hospede);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/guests/${hospede.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(hospede);
  });

  it('Deve criar', () => {
    const hospede = { id: '10', name: 'Hóspede Teste' } as any;

    service.criar(hospede).subscribe((result) => {
      expect(result).toEqual(hospede);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/guests`);
    expect(req.request.method).toBe('POST');
    req.flush(hospede);
  });

  it('Deve editar', () => {
    const hospede = { id: '10', name: 'Hóspede Teste' } as any;

    service.editar(hospede.id, hospede).subscribe((result) => {
      expect(result).toEqual(hospede);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/guests/${hospede.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(hospede);
  });

  it('Deve excluir', () => {
    const reservationId = '10';

    service.excluir(reservationId).subscribe((result) => {
      expect(result).toEqual(true);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/guests/${reservationId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(true);
  });

});
