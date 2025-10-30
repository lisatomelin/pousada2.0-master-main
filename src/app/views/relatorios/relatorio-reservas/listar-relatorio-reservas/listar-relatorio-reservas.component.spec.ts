import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarRelatorioReservasComponent } from './listar-relatorio-reservas.component';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { FinanceiroService } from 'src/app/views/financeiro/services/financeiro.service';
import { ReservasService } from 'src/app/views/reservas/services/reservas.service';
import { HospedesService } from 'src/app/views/hospedes/services/hospedes.service';
import { QuartosService } from 'src/app/views/quartos/services/quartos.service';
import { of } from 'rxjs';

describe('ListarRelatorioReservasComponent', () => {
  let component: ListarRelatorioReservasComponent;
  let fixture: ComponentFixture<ListarRelatorioReservasComponent>;

  // 🧩 mocks mínimos para evitar erros de injeção e chamadas HTTP
  const notificationStub = { erro: jest.fn(), sucesso: jest.fn() };
  const financeiroStub = { selecionarTodos: jest.fn().mockReturnValue(of([])) };
  const reservasStub = { selecionarTodos: jest.fn().mockReturnValue(of([])) };
  const hospedesStub = { selecionarTodos: jest.fn().mockReturnValue(of([])) };
  const quartosStub = { selecionarTodos: jest.fn().mockReturnValue(of([])) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarRelatorioReservasComponent],
      providers: [
        { provide: NotificationService, useValue: notificationStub },
        { provide: FinanceiroService, useValue: financeiroStub },
        { provide: ReservasService, useValue: reservasStub },
        { provide: HospedesService, useValue: hospedesStub },
        { provide: QuartosService, useValue: quartosStub }
      ]
    })
      // 🚫 Evita erros ao tentar carregar HTML/SCSS no Jest
      .overrideComponent(ListarRelatorioReservasComponent, {
        set: { template: '', styleUrls: [] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(ListarRelatorioReservasComponent);
    component = fixture.componentInstance;

    // Executa o ngOnInit() (não dá erro porque mocks retornam `of([])`)
    fixture.detectChanges();
  });

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });
});
