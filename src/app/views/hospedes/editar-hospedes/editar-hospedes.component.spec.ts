import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { HospedesService } from '../services/hospedes.service';
import { EditarHospedesComponent } from './editar-hospedes.component';
import { of } from 'rxjs';

describe('EditarHospedesComponent', () => {
  let component: EditarHospedesComponent;
  let fixture: ComponentFixture<EditarHospedesComponent>;

  // 🧩 mocks mínimos necessários
  const routerStub = { navigate: jest.fn() };
  const activatedRouteStub = {
    snapshot: { paramMap: { get: jest.fn().mockReturnValue('1') } }
  };
  const notificationStub = { sucesso: jest.fn(), erro: jest.fn() };
  const hospedesStub = {
    selecionarPorId: jest.fn().mockReturnValue(of({ id: '1' }))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarHospedesComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerStub },
        { provide: NotificationService, useValue: notificationStub },
        { provide: HospedesService, useValue: hospedesStub },
      ]
    })
      // 🚫 evita erros de parsing de template/scss
      .overrideComponent(EditarHospedesComponent, {
        set: { template: '', styleUrls: [] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(EditarHospedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // executa ngOnInit()
  });

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });
});
