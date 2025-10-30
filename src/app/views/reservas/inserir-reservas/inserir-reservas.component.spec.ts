import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InserirReservasComponent } from './inserir-reservas.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { ReservasService } from '../services/reservas.service';
import { HospedesService } from '../../hospedes/services/hospedes.service';
import { QuartosService } from '../../quartos/services/quartos.service';

describe('InserirReservasComponent', () => {
  let component: InserirReservasComponent;
  let fixture: ComponentFixture<InserirReservasComponent>;

  // 🧩 mocks mínimos
  const routerStub = { navigate: jest.fn() };
  const notificationStub = { sucesso: jest.fn(), erro: jest.fn() };
  const reservasStub = { inserir: jest.fn(), selecionarTodos: jest.fn() };
  const hospedesStub = { selecionarTodos: jest.fn().mockReturnValue(of([])) };
  const quartosStub = { selecionarTodos: jest.fn().mockReturnValue(of([])) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InserirReservasComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerStub },
        { provide: NotificationService, useValue: notificationStub },
        { provide: ReservasService, useValue: reservasStub },
        { provide: HospedesService, useValue: hospedesStub },
        { provide: QuartosService, useValue: quartosStub },
      ]
    })
      // 🚫 Evita erro de template/scss no Jest
      .overrideComponent(InserirReservasComponent, {
        set: { template: '', styleUrls: [] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(InserirReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // executa ngOnInit()
  });

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });
});
