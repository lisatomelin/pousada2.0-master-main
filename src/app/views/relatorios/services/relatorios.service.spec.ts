import { TestBed } from '@angular/core/testing';
import { RelatoriosService } from './relatorios.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { ReservationViewModel } from '../../reservas/models/reservation-View.Model';

describe('RelatoriosService', () => {
  let service: RelatoriosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // <-- necessário para mockar o HttpClient
      providers: [RelatoriosService],
    });

    service = TestBed.inject(RelatoriosService);
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

    const req = httpMock.expectOne(`${environment.API_URL}/reports`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('Deve selecionar por ID', () => {
    const reserva = { id: '10', name: 'Reserva Teste' } as any;

    service.selecionarPorId(reserva.id).subscribe((result) => {
      expect(result).toEqual(reserva);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/reports/${reserva.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(reserva);
  });
});
