import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { HospedesService } from '../services/hospedes.service';
import { InserirHospedesComponent } from './inserir-hospedes.component';

describe('InserirHospedesComponent', () => {
  let component: InserirHospedesComponent;
  let fixture: ComponentFixture<InserirHospedesComponent>;

  // 🧩 mocks mínimos necessários
  const routerStub = { navigate: jest.fn() };
  const notificationStub = { sucesso: jest.fn(), erro: jest.fn() };
  const hospedesStub = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InserirHospedesComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerStub },
        { provide: NotificationService, useValue: notificationStub },
        { provide: HospedesService, useValue: hospedesStub },
      ]
    })
      // 🚫 evita erros de parsing de template/scss
      .overrideComponent(InserirHospedesComponent, {
        set: { template: '', styleUrls: [] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(InserirHospedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // executa ngOnInit()
  });

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });
});
