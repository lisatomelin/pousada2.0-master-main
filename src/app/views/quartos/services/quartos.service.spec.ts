import { TestBed } from '@angular/core/testing';
import { QuartosService } from './quartos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { RoomsViewModel } from '../models/rooms-View.Model';

describe('QuartosService', () => {
  let service: QuartosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // <-- necessário para mockar o HttpClient
      providers: [QuartosService],
    });

    service = TestBed.inject(QuartosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // garante que não há requisições pendentes
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('Deve selecionar todos', () => {
    const mockData: RoomsViewModel[] = [{ id: '1' } as any];

    service.selecionarTodos().subscribe((result) => {
      expect(result).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/rooms`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('Deve selecionar por ID', () => {
    const quarto = { id: '10', name: 'Quarto Teste' } as any;

    service.selecionarPorId(quarto.id).subscribe((result) => {
      expect(result).toEqual(quarto);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/rooms/${quarto.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(quarto);
  });

  it('Deve criar', () => {
    const quarto = { id: '10', name: 'Quarto Teste' } as any;

    service.criar(quarto).subscribe((result) => {
      expect(result).toEqual(quarto);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/rooms`);
    expect(req.request.method).toBe('POST');
    req.flush(quarto);
  });

  it('Deve editar', () => {
    const quarto = { id: '10', name: 'Quarto Teste' } as any;

    service.editar(quarto.id, quarto).subscribe((result) => {
      expect(result).toEqual(quarto);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/rooms/${quarto.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(quarto);
  });

  it('Deve excluir', () => {
    const quartoId = '10';

    service.excluir(quartoId).subscribe((result) => {
      expect(result).toEqual(true);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/rooms/${quartoId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(true);
  });

});
