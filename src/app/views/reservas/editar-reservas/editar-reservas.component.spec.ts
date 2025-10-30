import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarReservasComponent } from './editar-reservas.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { ReservasService } from '../services/reservas.service';
import { HospedesService } from '../../hospedes/services/hospedes.service';
import { QuartosService } from '../../quartos/services/quartos.service';

describe('EditarReservasComponent', () => {
  let component: EditarReservasComponent;
  let fixture: ComponentFixture<EditarReservasComponent>;

  // 🧩 mocks mínimos necessários
  const routerStub = { navigate: jest.fn() };
  const notificationStub = { sucesso: jest.fn(), erro: jest.fn() };
  const reservasStub = {
    selecionarPorId: jest.fn().mockReturnValue(of({ id: '1' })),
    selecionarTodos: jest.fn().mockReturnValue(of([]))
  };
  const hospedesStub = { selecionarTodos: jest.fn().mockReturnValue(of([])) };
  const quartosStub = { selecionarTodos: jest.fn().mockReturnValue(of([])) };
  const activatedRouteStub = {
    snapshot: { paramMap: { get: jest.fn().mockReturnValue('1') } }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarReservasComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: NotificationService, useValue: notificationStub },
        { provide: ReservasService, useValue: reservasStub },
        { provide: HospedesService, useValue: hospedesStub },
        { provide: QuartosService, useValue: quartosStub },
      ]
    })
      // 🚫 evita erros de parsing de template/scss
      .overrideComponent(EditarReservasComponent, {
        set: { template: '', styleUrls: [] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(EditarReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // executa ngOnInit()
  });

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });
});
