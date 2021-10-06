import { Component, Input, OnInit } from '@angular/core';
import { ServicosService } from '../../service/servicos.service';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
})
export class EventoComponent implements OnInit {
  @Input()
  pegarEvento: any;

  duracaoEvento: number = 0;
  nParticipantes: number = 0;
  tDeFala: number = 0;
  qtdSessao: number = 0;
  qtdSala: number = 0;
  qtdParticipantes: number = 0;
  dadosEvento: any;
  preVisualizacao: boolean = false;
  gerarArquivoXls: any;
  gerarArquivoPdf: any;
  dadosXls: any;
  dadosSalvos: any;
  data: any;
  usuario: any;
  pdf: boolean = false;
  mensageem = 'Evento configurado com sucesso!';

  constructor(
    private servicosService: ServicosService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.servicosService.carregarItem().subscribe((res) => {      
      this.dadosEvento = res;     
      this.dadosXls = this.dadosEvento;      
    });

    this.usuario = localStorage.getItem('USER_INFO');
    this.usuario = JSON.parse(this.usuario);
  }

  verificarParticipantes(e: any) {
    this.nParticipantes = parseInt(e.target.value);

    this.nParticipantes <= 25
      ? (this.qtdSala = 5)
      : this.nParticipantes > 25 && this.nParticipantes <= 49
      ? (this.qtdSala = 7)
      : (this.qtdSala = 11);

    this.qtdSessao = this.qtdSala + 1;
  }

  salvar() {
    const id = this.dadosEvento[0].id;
    const body = {
      duracaoEvento: this.duracaoEvento,
      nParticipantes: this.nParticipantes,
      qtdSala: this.qtdSala,
      qtdSessao: this.qtdSessao,
      tDeFala: this.tDeFala,
      id: id,
    };

    this.servicosService.salvarEvento(id, body).subscribe((res) => {
      if(res) {
        console.log("patch", res);
        this.dadosSalvos = res;
        this.toastr.success('As informações foram salvas com sucesso!');
      }
      
      this.ngOnInit();    
    }, (err) => {
      this.toastr.error('Ocorreu um erro ao salvar as informações!');
      console.log("ERROR", err);      
    });
  }

  relatorios() {
    this.preVisualizacao = true;
    if(this.preVisualizacao == true) {
      this.gerarArquivoXls = this.dadosSalvos
    } 
    this.gerarArquivoPdf = this.dadosXls[0];
    this.downloadXls('');
  }

  voltar() {
    this.preVisualizacao = false;
  }

  finalizar() {
    this.toastr.success(this.mensageem);
  }

  downloadPdf(e: any) {
    
    const doc = new jsPDF();

    e.stopPropagation();
    e.preventDefault();

    doc.addImage('../../../assets/img/cab1.png', 'PNG', 0, 0, 211, 20);
    doc.text('Gestão De Eventos', 85, 30);
    doc.addImage('../../../assets/img/rod1.png', 'PNG', 0, 277, 211, 20);

    //  tabela
    autoTable(doc, {
      html: '#teste',
      margin: { top: 40, right: 5, bottom: 0, left: 5 },
    });

    doc.save('g-eventos.pdf');
  }

  downloadXls(e: any) {
    const fileName = 'ExcelSheet.xlsx';
    this.gerarArquivoXls = this.dadosXls;

    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, fileName);

    e.stopPropagation();
    e.preventDefault();
  }
}
