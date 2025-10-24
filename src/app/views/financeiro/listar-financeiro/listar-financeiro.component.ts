import { FinanceiroService } from './../services/financeiro.service';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { FinancialViewModel } from '../models/financial-View.Model';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { lerFalhaHttp } from 'src/app/core/utils/ler-falha-http';
@Component({
  selector: 'app-listar-financeiro',
  templateUrl: './listar-financeiro.component.html',
  styleUrls: ['./listar-financeiro.component.scss'],
})
export class ListarFinanceiroComponent implements OnInit {
  financeiro$?: Observable<FinancialViewModel[]>;

  constructor(
    private notification: NotificationService,
    private financeiroService: FinanceiroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findReservas();
  }

  protected formatarData(date: Date): string {
    let dataReal: string = date as unknown as string;
    if (dataReal.includes('T')) {
      dataReal = dataReal.split('T')[0];
    }
    if (dataReal.includes('-')){
      const auxiliary: string[] = dataReal.split('-');
      dataReal = auxiliary.reverse().join('/');
    }
    return dataReal;
  }

  checkoutReserva(financeiro: FinancialViewModel): void {
    if (financeiro.status === 'Finalizado') return;
    this.financeiroService.checkout(financeiro.id).subscribe({
      next: () => this.processarSucesso(),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso() {
    this.notification.sucesso(
      "CheckOut realizado com sucesso!"
    );
    this.findReservas();
  }

  toEdit(financeiro: FinancialViewModel): void {
    if (financeiro.status === 'Finalizado') return;
    this.router.navigate([`/financeiro/editar/${financeiro.id}`])
  }

  processarFalha(err: HttpErrorResponse) {
    this.notification.erro(lerFalhaHttp(err));
  }

  private findReservas() {
    this.financeiro$ = this.financeiroService.selecionarTodos();
  }

}
