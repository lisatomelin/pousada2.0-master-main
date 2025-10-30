import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarQuartosComponent } from './listar-quartos.component';
import { QuartosService } from '../services/quartos.service';
import { of } from 'rxjs';

describe('ListarQuartosComponent', () => {
  let component: ListarQuartosComponent;
  let fixture: ComponentFixture<ListarQuartosComponent>;

  // Mock mínimo do serviço
  const quartosServiceStub = {
    selecionarTodos: jest.fn().mockReturnValue(of([]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarQuartosComponent],
      providers: [
        { provide: QuartosService, useValue: quartosServiceStub }
      ]
    })
      // evita erro de template/scss no Jest
      .overrideComponent(ListarQuartosComponent, {
        set: { template: '', styleUrls: [] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(ListarQuartosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });
});
