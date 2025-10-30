import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarHospedesComponent } from './listar-hospedes.component';
import { HospedesService } from '../services/hospedes.service';
import { of } from 'rxjs';

describe('ListarHospedesComponent', () => {
  let component: ListarHospedesComponent;
  let fixture: ComponentFixture<ListarHospedesComponent>;

  // mock mínimo do serviço
  const hospedesServiceStub = {
    selecionarTodos: jest.fn().mockReturnValue(of([]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarHospedesComponent],
      providers: [
        { provide: HospedesService, useValue: hospedesServiceStub }
      ]
    })
      // evita erro de template/scss no Jest
      .overrideComponent(ListarHospedesComponent, {
        set: { template: '', styleUrls: [] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(ListarHospedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });
});
