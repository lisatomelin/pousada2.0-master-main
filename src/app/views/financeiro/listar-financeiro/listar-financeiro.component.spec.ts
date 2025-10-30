import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarFinanceiroComponent } from './listar-financeiro.component';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { FinanceiroService } from '../services/financeiro.service';
import { Router } from '@angular/router';

describe('ListarFinanceiroComponent', () => {
  let component: ListarFinanceiroComponent;
  let fixture: ComponentFixture<ListarFinanceiroComponent>;

  // Stubs mínimos
  const notificationStub = { sucesso: jest.fn(), erro: jest.fn() };
  const financeiroStub = {
    selecionarTodos: jest.fn().mockReturnValue(of([])),
    checkout: jest.fn()
  };
  const routerStub = { navigate: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarFinanceiroComponent],
      providers: [
        { provide: NotificationService, useValue: notificationStub },
        { provide: FinanceiroService, useValue: financeiroStub },
        { provide: Router, useValue: routerStub }
      ]
    })
      // evita parse de template/scss no Jest
      .overrideComponent(ListarFinanceiroComponent, {
        set: { template: '', styleUrls: [] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(ListarFinanceiroComponent);
    component = fixture.componentInstance;

    // opcional: você pode omitir detectChanges() se quiser evitar ngOnInit
    fixture.detectChanges();
  });

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });
});
