import { Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  
  gridEventos: boolean = true
  configuracaoEventos: boolean = false
  dadosExportresp: any;
  dadosDoEvento: any

  constructor() {
    
  }

  ngOnInit(): void {
    
  }
  
  
  
  evento(dados:any) {
    this.dadosDoEvento = dados;
    // console.log("RecebendoDados da tabela", this.dadosDoEvento)   
    this.dadosExportresp = dados;
  }


}
