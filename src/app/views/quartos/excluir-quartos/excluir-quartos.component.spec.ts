import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { QuartosService } from '../services/quartos.service';
import { ExcluirQuartosComponent } from './excluir-quartos.component';

describe('ExcluirQuartosComponent', () => {
  let component: ExcluirQuartosComponent;
  let fixture: ComponentFixture<ExcluirQuartosComponent>;

  // 🧩 mocks mínimos necessários
  const routerStub = { navigate: jest.fn() };
  const activatedRouteStub = {
    snapshot: { paramMap: { get: jest.fn().mockReturnValue('1') } }
  };
  const notificationStub = { sucesso: jest.fn(), erro: jest.fn() };
  const quartosStub = { 
    selecionarPorId: jest.fn().mockReturnValue(of({ id: 1 }))
   };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExcluirQuartosComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerStub },
        { provide: NotificationService, useValue: notificationStub },
        { provide: QuartosService, useValue: quartosStub },
      ]
    })
      // 🚫 evita erros de parsing de template/scss
      .overrideComponent(ExcluirQuartosComponent, {
        set: { template: '', styleUrls: [] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(ExcluirQuartosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // executa ngOnInit()
  });

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });
});
