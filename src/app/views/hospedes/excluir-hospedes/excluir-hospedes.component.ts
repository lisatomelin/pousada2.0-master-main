import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GuestViewModel } from '../models/guest-View.Model';
import { HospedesService } from '../services/hospedes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { lerFalhaHttp } from 'src/app/core/utils/ler-falha-http';
@Component({
  selector: 'app-excluir-hospedes',
  templateUrl: './excluir-hospedes.component.html',
  styleUrls: ['./excluir-hospedes.component.scss']
})
export class ExcluirHospedesComponent implements OnInit {
  hospedesVM?: Observable<GuestViewModel | undefined>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hospedesService: HospedesService,
    private notification: NotificationService
  ) {}


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.hospedesVM = this.hospedesService.selecionarPorId(id)
  }

  gravar(){
    const id = this.route.snapshot.paramMap.get('id')!;
    this.hospedesService.excluir(id).subscribe({
      next: () => this.processarSucesso(),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso() {
    this.notification.sucesso(
      "O Hóspede foi excluído com sucesso!"
    )

    this.router.navigate(['/hospedes', 'listar']);
  }

  processarFalha(err: HttpErrorResponse){
    this.notification.erro(lerFalhaHttp(err));
  }

}
