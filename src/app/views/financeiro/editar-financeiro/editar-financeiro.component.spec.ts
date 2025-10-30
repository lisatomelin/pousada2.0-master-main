import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarFinanceiroComponent } from './editar-financeiro.component';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { FinanceiroService } from '../services/financeiro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('EditarFinanceiroComponent', () => {
  let component: EditarFinanceiroComponent;
  let fixture: ComponentFixture<EditarFinanceiroComponent>;

  // Stubs mínimos
  const notificationStub = { sucesso: jest.fn(), erro: jest.fn() };
  const financeiroStub = {
    selecionarPorId: jest.fn().mockReturnValue(of({ id: '1' })),
  };
  const routerStub = { navigate: jest.fn() };
  const activatedRouteStub = {
    snapshot: { paramMap: { get: jest.fn().mockReturnValue(1) } }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarFinanceiroComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: NotificationService, useValue: notificationStub },
        { provide: FinanceiroService, useValue: financeiroStub },
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    })
      // evita parse de template/scss no Jest
      .overrideComponent(EditarFinanceiroComponent, {
        set: { template: '', styleUrls: [] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(EditarFinanceiroComponent);
    component = fixture.componentInstance;

    // opcional: você pode omitir detectChanges() se quiser evitar ngOnInit
    fixture.detectChanges();
  });

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });
});
