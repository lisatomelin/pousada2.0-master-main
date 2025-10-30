import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { QuartosService } from '../services/quartos.service';
import { InserirQuartosComponent } from './inserir-quartos.component';

describe('InserirQuartosComponent', () => {
  let component: InserirQuartosComponent;
  let fixture: ComponentFixture<InserirQuartosComponent>;

  // 🧩 mocks mínimos necessários
  const routerStub = { navigate: jest.fn() };
  const notificationStub = { sucesso: jest.fn(), erro: jest.fn() };
  const quartosStub = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InserirQuartosComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerStub },
        { provide: NotificationService, useValue: notificationStub },
        { provide: QuartosService, useValue: quartosStub },
      ]
    })
      // 🚫 evita erros de parsing de template/scss
      .overrideComponent(InserirQuartosComponent, {
        set: { template: '', styleUrls: [] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(InserirQuartosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // executa ngOnInit()
  });

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });
});
