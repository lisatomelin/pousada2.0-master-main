import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { ReservasService } from '../services/reservas.service';
import { ExcluirReservasComponent } from './excluir-reservas.component';

describe('ExcluirReservasComponent', () => {
  let component: ExcluirReservasComponent;
  let fixture: ComponentFixture<ExcluirReservasComponent>;

  const routerStub = { navigate: jest.fn() };
  const notificationStub = { sucesso: jest.fn(), erro: jest.fn() };
  const reservasStub = {
    selecionarPorId: jest.fn().mockReturnValue(of({ id: '1' }))
  };
  const activatedRouteStub = {
    snapshot: { paramMap: { get: jest.fn().mockReturnValue('1') } }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExcluirReservasComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: NotificationService, useValue: notificationStub },
        { provide: ReservasService, useValue: reservasStub },
      ]
    })
      // 🚫 evita erros de parsing de template/scss
      .overrideComponent(ExcluirReservasComponent, {
        set: { template: '', styleUrls: [] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(ExcluirReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // executa ngOnInit()
  });

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });
});
