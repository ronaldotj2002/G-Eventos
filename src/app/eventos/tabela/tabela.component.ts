import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { ServicosService} from '../../service/servicos.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {

  @Output() enviarDadosEvento = new EventEmitter();
  @Output() enviarDadosEventoItem = new EventEmitter();

  columns = [
    'Código/Nome', 'Responsável', 'Status da Confirmação', 'Última Atualização', ''
  ]

  listaGrid: any;
  dadosBusca: any;
  status: any;
  configuracaoEventos: boolean = false
  mensagemGrid: boolean = false;
  listaStatus = [];
  totalPaginacao: any;
  start : number = 0;
  proximaPagina : number = 0;
  paginaAnterior : number = 1;
  numPagina: any;
  qtdLinhaInicial: number = 0;
  contadorLinhaEsqueda: number = 1;
  contadorLinhaDireita: number = 0;

  constructor(
    private authService: AuthenticationService,
    private servicosService: ServicosService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.lista();
  }

  lista() {
    this.servicosService.listarGrid().subscribe(
      (res) => {
        this.listaGrid = res;
        this.totalPaginacao = res;
        this.mensagemGrid = false;
        this.contadorLinhaDireita = this.listaGrid.length;
      })
  }

  busca() {
    if(this.status !== undefined && this.dadosBusca === undefined || this.dadosBusca === '') {     
      this.servicosService.selectFiltro(this.status).subscribe(
        (res) => {
          this.listaGrid = res;
          this.mensagemGrid = false;
        }
      )
    }

    if(this.status === undefined || this.status == '' && this.dadosBusca !== undefined) {
      this.servicosService.dadosFiltro(this.dadosBusca).subscribe(
        (res) => { 
          if(res == '') {
            this.servicosService.dadosFiltroNome(this.dadosBusca).subscribe(
              (res) => {
                this.listaGrid = res;
                this.listaGrid == '' ? this.mensagemGrid = true : this.mensagemGrid = false;

              }
            )           
          } else {
            this.listaGrid = res;
            this.mensagemGrid = false;
          }       
        }
      )
    }

    
  }

  paginacao(dados:any) {
    this.start = 1;    
    this.contadorLinhaEsqueda = 1;
    this.numPagina = parseInt(dados.target.value);
    this.servicosService.carregarPaginacao(this.start, this.numPagina).subscribe(
      (res) => {
        this.listaGrid = res;
        // this.contadorLinhaEsqueda = 1;
        this.contadorLinhaDireita = this.numPagina;
      }
    )

  }

  mudarPaginacao(dados:any) {
    if(dados === 'proxima') {
      if(this.contadorLinhaDireita !== this.totalPaginacao?.length){
        this.proximaPagina = this.proximaPagina + 1;  
        this.qtdLinhaInicial = this.numPagina 
        this.contadorLinhaEsqueda = this.contadorLinhaEsqueda + this.qtdLinhaInicial;
        this.contadorLinhaDireita = this.contadorLinhaDireita + this.qtdLinhaInicial;
      }
     

      this.servicosService.proximaPagina(this.proximaPagina, this.numPagina).subscribe(
        (res) => {
          this.listaGrid = res;
        
        }
      )
    } 
    if(dados === 'anterior') {
      if(this.contadorLinhaEsqueda !== 1){

        const valor = this.proximaPagina - this.paginaAnterior
        this.paginaAnterior = valor
        this.contadorLinhaEsqueda = this.contadorLinhaEsqueda - this.qtdLinhaInicial;
        this.contadorLinhaDireita = this.contadorLinhaDireita - this.qtdLinhaInicial;        
        
        this.servicosService.proximaPagina(this.paginaAnterior, this.numPagina).subscribe(
          (res) => {
            this.listaGrid = res;
          }
          )
        }
      }
  }

  acessarEvento(evento:any) {
    this.router.navigateByUrl('/evento');
    this.enviarDadosEvento.emit(evento);
    this.enviarDadosEventoItem.emit(evento);
    this.servicosService.notificar(evento);
  }


}
