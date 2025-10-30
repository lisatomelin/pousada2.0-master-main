import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarReservasComponent } from './listar-reservas.component';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { ReservasService } from '../services/reservas.service';
import { HospedesService } from '../../hospedes/services/hospedes.service';
import { QuartosService } from '../../quartos/services/quartos.service';

// mocks simples que simulam o comportamento esperado
const mockReservasService = {
  selecionarTodos: jest.fn().mockReturnValue(of([]))
};
const mockHospedesService = {
  selecionarTodos: jest.fn().mockReturnValue(of([]))
};
const mockQuartosService = {
  selecionarTodos: jest.fn().mockReturnValue(of([]))
};
const mockNotificationService = {
  erro: jest.fn()
};

describe('ListarReservasComponent', () => {
  let component: ListarReservasComponent;
  let fixture: ComponentFixture<ListarReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarReservasComponent],
      providers: [
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: ReservasService, useValue: mockReservasService },
        { provide: HospedesService, useValue: mockHospedesService },
        { provide: QuartosService, useValue: mockQuartosService }
      ]
    })
    // evita que o Jest tente carregar o HTML e SCSS
    .overrideComponent(ListarReservasComponent, {
      set: { template: '', styleUrls: [] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });
});