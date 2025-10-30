import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { QuartosService } from '../services/quartos.service';
import { EditarQuartosComponent } from './editar-quartos.component';

describe('EditarQuartosComponent', () => {
  let component: EditarQuartosComponent;
  let fixture: ComponentFixture<EditarQuartosComponent>;

  // 🧩 mocks mínimos necessários
  const routerStub = { navigate: jest.fn() };
  const activatedRouteStub = {
    snapshot: { paramMap: { get: jest.fn().mockReturnValue('1') } }
  };
  const notificationStub = { sucesso: jest.fn(), erro: jest.fn() };
  const quartosStub = { 
    selecionarPorId: jest.fn().mockReturnValue(of({ id: 1 })),
    selecionarTodos: jest.fn().mockReturnValue(of([]))
   };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarQuartosComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerStub },
        { provide: NotificationService, useValue: notificationStub },
        { provide: QuartosService, useValue: quartosStub },
      ]
    })
      // 🚫 evita erros de parsing de template/scss
      .overrideComponent(EditarQuartosComponent, {
        set: { template: '', styleUrls: [] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(EditarQuartosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // executa ngOnInit()
  });

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });
});
