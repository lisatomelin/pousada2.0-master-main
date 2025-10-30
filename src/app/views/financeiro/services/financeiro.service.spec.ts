import { TestBed } from '@angular/core/testing';
import { FinanceiroService } from './financeiro.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { FinancialViewModel } from '../models/financial-View.Model';

describe('FinanceiroService', () => {
  let service: FinanceiroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // <-- necessário para mockar o HttpClient
      providers: [FinanceiroService],
    });

    service = TestBed.inject(FinanceiroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // garante que não há requisições pendentes
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('Deve selecionar todos', () => {
    const mockData: FinancialViewModel[] = [{ id: '1' } as any];

    service.selecionarTodos().subscribe((result) => {
      expect(result).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/financial`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('Deve selecionar por ID', () => {
    const financeiro = { id: '10' } as any;

    service.selecionarPorId(financeiro.id).subscribe((result) => {
      expect(result).toEqual(financeiro);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/financial/${financeiro.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(financeiro);
  });

  it('Deve editar', () => {
    const financeiro = { id: '10' } as any;

    service.editar(financeiro).subscribe((result) => {
      expect(result).toEqual(financeiro);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/financial`);
    expect(req.request.method).toBe('PUT');
    req.flush(financeiro);
  });

  it('Deve realizar checkout', () => {
    const financeiroId = '10';

    service.checkout(financeiroId).subscribe();

    const req = httpMock.expectOne(`${environment.API_URL}/financial/${financeiroId}/checkout`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBeNull(); // o body é null
    req.flush({});
  });

});
